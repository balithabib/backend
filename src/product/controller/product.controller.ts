import { Controller, Get, Param, Post, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ProductService } from '../service/product.service';

@Controller('product')
export class ProductController {

  constructor(private readonly productService: ProductService) {
  }

  @Post('set')
  async setProduct(@Req() req): Promise<any> {
    return await this.productService.create(req.body);
  }

  @Get('get/:id')
  async getProduct(@Param('id') id: number): Promise<any> {
    return await this.productService.findById(id);
  }

  @Get('get_all')
  async getAllProduct(): Promise<any> {
    return await this.productService.getAllProduct();
  }
}
