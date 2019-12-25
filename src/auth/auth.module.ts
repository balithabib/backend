import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserService } from './user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './auth/jwt-strategy/jwt-strategy.service';
import { LocalStrategy } from './auth/local-strategy/local-strategy.service';
import { jwtConstants } from './auth/jwt-strategy/jwt.constants';

@Module({
  imports: [

    JwtModule.register({
      secret: jwtConstants.secret,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UserService, AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})

export class AuthModule {
}
