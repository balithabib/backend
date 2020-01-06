import { Controller, Get, Param, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from '../utils/upload.utils';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { ProductService } from '../service/product.service';

@Controller('image')
export class ImageController {
  constructor(private readonly productService: ProductService) {
  }

  @Post('set_one/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file, @Param('id') id) {
    await fs.readFile(file.path, 'binary', (err, data) => {
      const dataBase64 = Buffer.from(data, 'binary').toString('base64');
      this.productService.setImage(dataBase64, id);
    });
    return {
      originalname: file.originalname,
      filename: file.filename,
    };
  }

  @Post('set_all/:id')
  @UseInterceptors(
    FilesInterceptor('images', 20, {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files, @Param('id') id) {
    const response = [];
    const dataBase64 = [];
    for (const file of files) {
      fs.readFile(file.path, 'binary', (err, data) => {
        dataBase64.push(Buffer.from(data, 'binary').toString('base64'));
      });
      const fileResponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileResponse);
    }
    await this.productService.setImage(dataBase64, id);
    return { size: files.length, data: response };
  }

  @Get('get/:path')
  seeUploadedFile(@Param('path') image, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }
}
