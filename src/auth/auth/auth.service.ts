import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcryptjs';
import { jwtConstants } from './jwt-strategy/jwt.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService) {
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByName(username);
    if (user && (await this.passwordsAreEqual(user.password, pass))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  public async login(user: User): Promise<any | { status: number }> {
    console.log(user.name, user.password);
    return this.validateUser(user.name, user.password).then((userData) => {
      if (!userData) {
        console.log('404');
        return { status: 404 };
      }

      const payload = { sub: user.id, username: user.name };

      return {
        access_token: this.jwtService.sign(payload),
        status: 200,
      };
    });
  }

  private async passwordsAreEqual(hashedPassword: string, plainPassword: string): Promise<boolean> {
    return plainPassword === hashedPassword;/*bcrypt.compare(plainPassword, hashedPassword);*/
  }

  public async register(user: User): Promise<any> {
    return this.userService.create(user);
  }
}
