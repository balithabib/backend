import { Controller, Get, Param, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { editFileNameBackground, imageFileFilter } from '../product/utils/upload.utils';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';
import { jwtConstants } from './auth/jwt-strategy/jwt.constants';

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
    return this.authService.getById(req.user.id);
  }

  @Post('set_background')
  @UseInterceptors(
    FilesInterceptor('images', 20, {
      storage: diskStorage({
        destination: './files',
        filename: editFileNameBackground,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files, @Param('id') id) {
    const response = [];
    for (const file of files) {
      const fileResponse = {
        filename: file.filename,
      };
      response.push(fileResponse);
    }
    return { size: files.length, data: response };
  }

  @Get('get_background')
  async getBackground(): Promise<any> {
    const randPath = './files/background-' + (Math.round(Math.random() * 10) + 1) + '.jpg';
    return {
      data: Buffer.from(
        fs.readFileSync(randPath, 'binary'),
        'binary').toString('base64'),
    };
  }
}
