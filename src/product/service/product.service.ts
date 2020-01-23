import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../model/product.entity';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>) {
  }

  async findById(id: number): Promise<ProductEntity> {
    return await this.productRepository.findOne({
      where: {
        id,
      },
    });
  }

  async getAllProduct(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async create(product): Promise<ProductEntity> {
    return await this.productRepository.save(product);
  }

  async setImage(dataBase64: string | string[], id: number) {
    let product;
    await this.findById(id).then(value => {
      product = value;
    });
    product.thumbnails.push(dataBase64);
    return await this.productRepository.save(product);
  }

}
