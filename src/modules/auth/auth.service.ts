import { BadRequestException, Injectable, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserDocument } from 'src/schemas/user.schema';
import { Auth, google } from 'googleapis';
import { ConfigService } from '@nestjs/config';
import { LoginAuthDto } from './dto/login.dto';
import { RegisterAuthDto } from './dto/register.dto';
import { MailerService } from '../mailer/mailer.service';
import { Twilio } from 'twilio';
@Injectable()
export class AuthService {
  twilioServiceId: string;
  private twilioClient: Twilio;
  oauthClient: Auth.OAuth2Client;
  clientID: string;
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService
  ) {
    const accountSid = configService.get<string>('TWILIO_ACCOUNT_SID');
    const authToken = configService.get<string>('TWILIO_AUTH_TOKEN');
    this.twilioServiceId = configService.get<string>('TWILIO_VERIFICATION_SERVICE_SID');

    this.twilioClient = new Twilio(accountSid, authToken);

    this.clientID = this.configService.get<string>('GOOGLE_AUTH_CLIENT_ID');
    const clientSecret = this.configService.get<string>('GOOGLE_AUTH_CLIENT_SECRET');

    this.oauthClient = new google.auth.OAuth2(
      this.clientID,
      clientSecret
    );
  }

  async authenticateGoogle(token: string) {
    let tokenInfo: Auth.TokenPayload;
    try {
      tokenInfo = await this.verifyGoogleToken(token);
    } catch (error) {
      throw new BadRequestException("Invalid token");
    }
    const { email, name, picture } = tokenInfo;
    let user: UserDocument = await this.userService.findOne({ email });
    const username = RegExp(/(.*)@/).exec(email)[1];
    if (!user) {
      user = await this.userService.create({
        email,
        name,
        username,
        password: Buffer.from(email).toString('base64'),
        picture
      });
    }
    return {
      access_token: await this.signToken(user)
    };
  }
  sendOtp(info: string) {
    return this.userService.findOne({
      $or: [
        { email: info },
        { phone: info },
        { username: info }
      ]
    }, { email: 1, phone: 1, _id: 0 }).lean()
  }

  async confirmOtp(info: string, otp: string) {
    if (!info.includes('@')) {
      const result = await this.twilioClient.verify.v2.services(this.twilioServiceId).verificationChecks.create({
        to: info,
        code: otp
      });

      if (!result.valid || result.status !== 'approved') {
        throw new BadRequestException('Wrong code provided');
      }
    }



    const user = await this.userService.findOne({
      email: info,
      "otp.expire": { $gte: new Date() }
    }).exec();
    if (!user || !otp.startsWith('4')) {
      throw new BadRequestException("Invalid OTP");
    }
    await this.userService.update(user._id, {
      otp: null
    }).exec();
    return {
      access_token: await this.signToken(user)
    }
  }


  async forgotPassword(info: string) {
    const user = await this.userService.findOne({
      $or: [
        { email: info },
        { phone: info }
      ]
    }).exec();
    if (user) {
      if (info.includes('@')) {
        //generate otp 3 digit and always start with 4
        const otp = Math.floor(4000 + Math.random() * 900).toString();
        await this.userService.update(user._id, {
          otp: {
            code: otp,
            expire: new Date(Date.now() + (15 * 60000)) // 15 minutes
          }
        }).exec();
        return this.mailerService.sendMail({
          from: "Aniflix",
          to: user.email,
          subject: "Forgot password",
          text: `
          Your OTP is ${otp}
          OTP will expire in 15 minutes`
        });
      } else {
        //convert phone to e.164 format
        return this.twilioClient.verify.v2.services(this.twilioServiceId).verifications.create({
          to: user.phone.replace(/^0/, '+84'),
          channel: 'sms'
        });
      }
    }
    return {
      message: "Email not found"
    }
  }

  async authenticateGoogle2(@Req() req) {
    if (!req.user) {
      return "No user from google";
    }
    return {
      message: 'User information from google',
      user: req.user
    }
  }

  async verifyGoogleToken(token: string) {
    const ticket = await this.oauthClient.verifyIdToken({
      idToken: token,
      audience: this.clientID
    });
    return ticket.getPayload();
  }

  async register(payload: RegisterAuthDto) {
    //check username or email exist
    const userExist = await this.userService.findOne({
      $or: [
        { username: payload.username }
      ]
    });

    if (userExist) {
      throw new BadRequestException("User already exist");
    }

    payload.password = Buffer.from(payload.password).toString('base64');

    const dto: any = payload;
    console.log("register", dto);
    const user: UserDocument = await this.userService.create(dto);
    return {
      access_token: await this.signToken(user)
    }
  }


  async login(payload: LoginAuthDto) {
    const passwordEncode = Buffer.from(payload.password).toString('base64');
    const user: UserDocument = await this.userService.findUsername({
      username: payload.username,
      password: passwordEncode
    });

    if (!user) {
      throw new BadRequestException("Invalid username or password");
    }
    return {
      access_token: await this.signToken(user)
    }
  }

  async signToken(user: UserDocument): Promise<string> {
    const payload = {
      sub: user._id,
      username: user.username,
      email: user.email,
      roles: user.role
    };
    return await this.jwtService.signAsync(payload)
  }

  validateUser(payload: any) {
    return this.userService.findOne(payload.sub);
  }
}
