import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { User } from './user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  //@UseGuards(AuthGuard('local'))
  @Post('login')
  async Login(@Req() req): Promise<any> {
    console.log('login : ', req.body);
    return await this.authService.login(req.body);
  }

  @Post('register')
  async register(@Req() req): Promise<any> {
    console.log('register : ', req.body);
    return await this.authService.register(req.body);
  }
}
