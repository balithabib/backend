import { Controller, Get, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { editFileNameBackground, imageFileFilter } from '../../product/utils/upload.utils';
import { diskStorage } from 'multer';
import { BackgroundService } from '../service/background.service';

@Controller('auth/background')
export class BackgroundController {

  constructor(private backgroundService: BackgroundService) {
  }

  @Get('get')
  async getBackground(): Promise<any> {
    return await this.backgroundService.getImage().then(result => {
      return {
        data: result.image,
      };
    });
  }

  @Post('set')
  @UseInterceptors(
    FilesInterceptor('images', 20, {
      storage: diskStorage({
        destination: './files',
        filename: editFileNameBackground,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles()files, @Param('id')id) {
    return {
      size: files.length,
      data: await this.backgroundService.setImages(files),
    };
  }
}
