import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { Product } from '../../product/model/product.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService) {
  }

  public async login(user: User): Promise<any> {
    return this.validateUser(user.name, user.password).then((userData) => {
      if (!userData) {
        return { code: 'NOT_FOUND' };
      }

      const payload = { sub: user.id, username: user.name };

      return {
        access_token: this.jwtService.sign(payload),
        code: 'FOUND',
        user: userData,
      };
    });
  }

  public async register(user: User): Promise<any> {
    return this.userService.create(user).then((result) => {
      return { code: 'CREATED', user: result };
    });
  }

  async getById(id: number): Promise<any> {
    return await this.userService.findById(id).then(result => {
      return { code: 'CREATED', user: result };
    });
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByName(username);
    if (user && (await this.passwordsAreEqual(user.password, pass))) {
      return user;
    }
    return null;
  }

  private async passwordsAreEqual(hashedPassword: string, plainPassword: string): Promise<boolean> {
    return plainPassword === hashedPassword;
  }

}
