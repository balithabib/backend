import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../model/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {
  }

  async findByName(name: string) {
    return await this.userRepository.findOne({
      where: [
        {
          name,
        },
      ],
    });
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}
