import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/user.entity';
import { UserService } from './service/user.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { JwtStrategy } from './service/strategy/jwt-strategy.service';
import { LocalStrategy } from './service/strategy/local-strategy.service';
import { jwtConstants } from './service/strategy/jwt.constants';
import { PassportModule } from '@nestjs/passport';
import { BackgroundController } from './controller/background.controller';
import { BackgroundService } from './service/background.service';
import { Background } from './model/bcakground.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([User, Background]),

  ],
  providers: [UserService, AuthService, LocalStrategy, JwtStrategy, BackgroundService],
  controllers: [AuthController, BackgroundController],
})

export class AuthModule {
}
