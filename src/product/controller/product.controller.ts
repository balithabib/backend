import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { CreateProductDto } from '../model/create-product.dto';
import { UpdateProductDto } from '../model/update-product.dto';
import { IngredientsEntity } from '../model/add-ingrdient.dto';
import { IngredientsService } from '../service/ingredients.service';

@Controller('product')
export class ProductController {

  constructor(private readonly productService: ProductService, private readonly  ingredientsService: IngredientsService) {
  }

  @Post()
  async setProduct(@Body() createProductDto: CreateProductDto): Promise<any> {
    return await this.productService.create(createProductDto);
  }

  @Get('one/:id')
  async getProduct(@Param('id') id: number): Promise<any> {
    return await this.productService.findById(id);
  }

  @Post('update/:id')
  async update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto): Promise<any> {
    return await this.productService.update(id, updateProductDto);
  }

  @Get('delete/:id')
  async delete(@Param('id') id: number): Promise<any> {
    return await this.productService.delete(id);
  }

  @Get('all')
  async getAllProduct(): Promise<any> {
    return await this.productService.getAllProduct();
  }

  @Post('/ingredients')
  async setIngredient(@Body() ingredients: any): Promise<any> {
    ingredients.ingredients.forEach(a => this.ingredientsService.save(a));
  }

  @Get('/ingredients')
  async getAllIngredient(@Body() ingredients: any): Promise<any> {
    return await this.ingredientsService.getAllIngredient();
  }

}
