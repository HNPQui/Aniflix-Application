import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService
  ) {
  }

  async login(username: string) {
    const user: UserDocument = await this.userService.findUsername({ username });
    console.log(user)
    return {
      access_token: await this.jwtService.signAsync({ sub: user._id, username })
    }
  }

  async validateUser(payload: any) {
    return await this.userService.findOne(payload.sub);
  }
}
