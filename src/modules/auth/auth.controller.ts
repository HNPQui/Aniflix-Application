import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HasRoles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  
  // @UseGuards(JwtAuthGuard)
  @HasRoles(Role.USER)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @Get(':username')
  login(@Param('username') username: string) {
    return this.authService.login(username);
  }
}
