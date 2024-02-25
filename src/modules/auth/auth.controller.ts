import { Controller, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get(':username')
  login(@Param('username') username: string) {
    return this.authService.login(username);
  }
}
