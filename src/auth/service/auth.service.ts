import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../model/user.entity';
import {UserLogin} from '../model/UserLogin.';
import * as bcrypt from 'bcrypt';

export enum UserCode {
  NOT_FOUND = 'NOT_FOUND',
  FOUND = 'FOUND',
  CREATED = 'CREATED',
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService) {
  }

  public async login(user: UserLogin): Promise<any> {
    return this.validateUser(user.email, user.password).then((result) => {
      if (!result) {
        return { code: UserCode.NOT_FOUND };
      }
      const payload = { sub: result.id, email: result.email };
      return {
        access_token: this.jwtService.sign(payload),
        code: UserCode.FOUND,
        user: result,
      };
    });
  }

  public async register(user: User): Promise<any> {
    user.password = await bcrypt.hash(user.password, 10).then(result => {
      return result;
    });
    return this.userService.create(user).then((result) => {
      const payload = { sub: result.id, email: result.email };
      return {
        access_token: this.jwtService.sign(payload),
        code: UserCode.CREATED,
        user: result,
      };
    });
  }

  async getProfile(id: number): Promise<any> {
    return await this.userService.findById(id).then(result => {
      return {
        code: UserCode.CREATED,
        user: {
          id: result.id,
          name: result.name,
          email: result.email,
        },
      };
    });
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await this.passwordsAreEqual(password, user.password))) {
      return user;
    }
    return null;
  }

  private async passwordsAreEqual(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

}
