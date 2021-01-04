import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/model/user.entity';
import { ProductModule } from './product/product.module';
import { ProductEntity } from './product/model/product.entity';
import { Background } from './auth/model/bcakground.entity';
import { VisitEntity } from './visit.entity';
import { IngredientsEntity } from './product/model/add-ingrdient.dto';
import { CommandEntity } from './product/model/command.entity';
import { RecommendationEntity } from './product/model/recommendation.entity';

@Module({
  imports: [AuthModule, ProductModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'base.sqlite',
      entities: [User, ProductEntity, Background, VisitEntity, IngredientsEntity, CommandEntity, RecommendationEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, ProductEntity, VisitEntity, IngredientsEntity, CommandEntity, RecommendationEntity])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
