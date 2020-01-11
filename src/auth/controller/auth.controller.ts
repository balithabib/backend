import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async Login(@Req() req): Promise<any> {
    return await this.authService.login(req.body);
  }

  @Post('register')
  async register(@Req() req): Promise<any> {
    return await this.authService.register(req.body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProduct(@Req() req): Promise<any> {
    return this.authService.getProfile(req.user.id);
  }
}
