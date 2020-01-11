import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/model/user.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/model/product.entity';
import { Background } from './auth/model/bcakground.entity';

@Module({
  imports: [AuthModule, ProductModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'base.sqlite',
      entities: [User, Product, Background],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Product])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
