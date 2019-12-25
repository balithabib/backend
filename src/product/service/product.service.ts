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
    /*const products = [];
    const count = await this.productRepository.count().then(value => {
      return value;
    });
    for (let id = 0; id < count; id++) {
      let a;
      await this.findById(id).then(value => {
        console.log(value);
        a = value;
      });
      products.push(a);
    }
    console.log(products);
    return products;*/
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
