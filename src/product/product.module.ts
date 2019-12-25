import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './model/product.entity';
import { MulterModule } from '@nestjs/platform-express';
import { ImageController } from './controller/image.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    MulterModule.register({
      dest: './files',
    }),
  ],
  controllers: [ProductController, ImageController],
  providers: [ProductService],
})

export class ProductModule {
}
