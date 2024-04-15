import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HasRoles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { LoginAuthDto } from './dto/login.dto';
import { RegisterAuthDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  // @UseGuards(JwtAuthGuard)
  @HasRoles(Role.USER)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @Post("login")
  login(@Body() payload: LoginAuthDto) {
    return this.authService.login(payload);
  }

  @Post("register")
  register(@Body() payload: RegisterAuthDto) {
    return this.authService.register(payload);
  }

  @Post("forgot-password")
  forgotPassword(@Body('info') info: string) {
    return this.authService.forgotPassword(info);
  }

  @Post("send-otp")
  sendOtp(@Body('info') info: string) {
    return this.authService.sendOtp(info);
  }

  @Post("confirm-otp")
  confirmOtp(
    @Body('info') info: string,
    @Body('otp') otp: string
  ) {
    return this.authService.confirmOtp(info, otp);
  }


  @Post('google')
  googleAuth(@Body('token') token: string) {
    return this.authService.authenticateGoogle(token);
  }

  @Post('google2')
  @UseGuards(AuthGuard('google'))
  googleAuth2(@Req() req) {
    return this.authService.authenticateGoogle2(req);
  }
}
