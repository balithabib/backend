import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { CreateProductDto } from '../model/create-product.dto';

@Controller('product')
export class ProductController {

  constructor(private readonly productService: ProductService) {
  }

  @Post()
  async setProduct(@Body() createProductDto: CreateProductDto): Promise<any> {
    return await this.productService.create(createProductDto);
  }

  @Get('one/:id')
  async getProduct(@Param('id') id: number): Promise<any> {
    return await this.productService.findById(id);
  }

  @Get('all')
  async getAllProduct(): Promise<any> {
    return await this.productService.getAllProduct();
  }
}
