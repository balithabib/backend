import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandEntity } from '../model/command.entity';

@Injectable()
export class CommandService {
  constructor(@InjectRepository(CommandEntity) private productRepository: Repository<CommandEntity>) {
  }

  async all(): Promise<CommandEntity[]> {
    return await this.productRepository.find();
  }

  async create(product): Promise<CommandEntity> {
    return await this.productRepository.save(product);
  }

  async update(command: any) {
    return await this.productRepository.update(command.id,
      {
        name: command.name,
        date: command.date,
        number: command.number,
        status: 'finished',
        price: command.price,
        ingredients: command.ingredients,
        idsProduct: command.idsProduct,
      });
  }

  async findByUser(number): Promise<CommandEntity[]> {
    return await this.productRepository.find({
      where: {
        number,
      },
    });
  }

  async findById(id: number): Promise<CommandEntity> {
    return await this.productRepository.findOne({
      where: {
        id,
      },
    });
  }

  async delete(product: { idProduct: string, idCommand: number }) {
    if (product && product.idProduct && product.idCommand) {
      await this.findById(product.idCommand).then(
        value => {
          const id = Number(value.idsProduct.findIndex(value1 => product.idProduct));
          value.idsProduct.splice(id, 1);
          this.productRepository.update(value.id,
            {
              name: value.name,
              date: value.date,
              number: value.number,
              status: value.status,
              price: value.price,
              ingredients: value.ingredients,
              idsProduct: value.idsProduct,
            }).then(value1 => console.log(value1));
        },
      );
    }
  }
}
