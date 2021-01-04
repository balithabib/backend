import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './model/product.entity';
import { MulterModule } from '@nestjs/platform-express';
import { ImageController } from './controller/image.controller';
import { IngredientsService } from './service/ingredients.service';
import { IngredientsEntity } from './model/add-ingrdient.dto';
import { CommandEntity } from './model/command.entity';
import { CommandService } from './service/command.service';
import { CommandController } from './controller/command.controller';
import { RecommendationController } from './controller/recommendation.controller';
import { RecommendationEntity } from './model/recommendation.entity';
import { RecommendationService } from './service/recommendation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, IngredientsEntity, CommandEntity, RecommendationEntity]),
    MulterModule.register({
      dest: './files',
    }),
  ],
  controllers: [ProductController, ImageController, CommandController, RecommendationController],
  providers: [ProductService, IngredientsService, CommandService, RecommendationService],
})

export class ProductModule {
}
