import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) { }

  async login(username: string) {
    return {
      access_token: await this.jwtService.signAsync({ sub: Date.now(), username }, {
        secret: 'jwtConstants.secret'
      })
    }
  }
}
