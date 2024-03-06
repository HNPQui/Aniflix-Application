import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService
  ) { }

  async login(username: string) {
    const user = await this.userService.findUsername({ username });
    console.log(user)
    return {
      access_token: await this.jwtService.signAsync({ sub: Date.now(), username }, {
        secret: 'jwtConstants.secret'
      })
    }
  }
}
