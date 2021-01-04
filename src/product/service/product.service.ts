import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../model/product.entity';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { RecommendationService } from './recommendation.service';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>, private recommendationService: RecommendationService) {
  }

  async findById(id: number): Promise<ProductEntity> {
    return await this.productRepository.findOne({
      where: {
        id,
      },
    });
  }

  async getAllProduct(): Promise<ProductEntity[]> {
    const productsNew = [];
    return await new Promise(async resolve => {
      await this.productRepository.find().then(async (products: any) => {
        for (const product of products) {
          await this.recommendationService.findById(product.id).then(value1 => {
            productsNew.push({
              id: product.id,
              name: product.name,
              type: product.type,
              size: product.size,
              price: product.price,
              quantity: product.quantity,
              description: product.description,
              images: product.images,
              love: value1 ? value1.love : 0,
              bad: value1 ? value1.bad : 0,
              buy: value1 ? value1.buy : 0,
            });
          });
        }
        resolve(productsNew);
      });
    });
  }

  async create(product): Promise<ProductEntity> {
    return await this.productRepository.save(product);
  }

  async setImage(dataBase64: string | string[], id: number) {
    let product;
    await this.findById(id).then(value => {
      product = value;
    });
    product.images.push(dataBase64);
    return await this.productRepository.save(product);
  }

  async update(id, product): Promise<UpdateResult> {
    return await this.productRepository.update(id,
      {
        name: product.name,
        type: product.type,
        size: product.size,
        price: product.size,
        quantity: product.quantity,
        description: product.description,
      });
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.productRepository.delete(id);
  }
}
