import { BadRequestException, Injectable, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserDocument } from 'src/schemas/user.schema';
import { Auth, google } from 'googleapis';
import { ConfigService } from '@nestjs/config';
import e from 'express';

@Injectable()
export class AuthService {
  oauthClient: Auth.OAuth2Client;
  clientID: string;
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly configService: ConfigService
  ) {
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
    var user: UserDocument = await this.userService.findOne({ email });
    if (!user) {
      user = await this.userService.create({
        email,
        name,
        picture
      });
    }
    return {
      access_token: await this.signToken(user)
    };
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


  async login(username: string) {
    const user: UserDocument = await this.userService.findUsername({ username });
    console.log(user)
    return {
      access_token: await this.jwtService.signAsync({ sub: user._id, username })
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
