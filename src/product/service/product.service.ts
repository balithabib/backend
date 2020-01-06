import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../model/product.entity';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {
  }

  async findById(id: number): Promise<Product> {
    return await this.productRepository.findOne({
      where: {
        id,
      },
    });
  }

  async getAllProduct(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async create(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }

  async setImage(dataBase64: string | string[], id: number) {
    let product;
    await this.findById(id).then(value => {
      product = value;
    });
    console.log('files : ', dataBase64.length, product.thumbnails.length);
    product.thumbnails.push(dataBase64);
    return await this.productRepository.save(product);
  }

}
