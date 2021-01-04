import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RecommendationEntity } from '../model/recommendation.entity';

@Injectable()
export class RecommendationService {
  constructor(@InjectRepository(RecommendationEntity) private productRepository: Repository<RecommendationEntity>) {
  }

  async all(): Promise<RecommendationEntity[]> {
    return await this.productRepository.find();
  }

  async findById(idProduct: number): Promise<RecommendationEntity> {
    return await this.productRepository.findOne({
      where: {
        idProduct,
      },
    });
  }

  async set(id): Promise<RecommendationEntity> {
    return await this.productRepository.save({
      idProduct: id,
      love: 0,
      bad: 0,
      buy: 0,
    });
  }

  async setOneLove(id): Promise<RecommendationEntity> {
    return await this.productRepository.save({
      idProduct: id,
      love: 1,
      bad: 0,
      buy: 0,
    });
  }

  async setOneBad(id): Promise<RecommendationEntity> {
    return await this.productRepository.save({
      idProduct: id,
      love: 0,
      bad: 1,
      buy: 0,
    });
  }

  async setOneBuy(id): Promise<RecommendationEntity> {
    return await this.productRepository.save({
      idProduct: id,
      love: 0,
      bad: 0,
      buy: 1,
    });
  }

  async addLove(idProduct) {
    await this.findById(idProduct).then(
      value => {
        console.log(value);
        if (value) {
          value.love++;
          this.productRepository.save(value).then(value1 => console.log(value1));
        } else {
          this.setOneLove(idProduct).then(value1 => console.log(value1));
        }

      },
    );
  }

  async subLove(idProduct) {
    await this.findById(idProduct).then(
      value => {
        if (value) {
          this.productRepository.update(value.idProduct,
            {
              idProduct: value.idProduct,
              love: value.love === 0 ? 0 : value.love--,
              bad: value.bad,
              buy: value.buy,
            }).then(value1 => console.log(value1));
        } else {
          this.set(value.idProduct).then(value1 => console.log(value1));
        }
      },
    );
  }

  async addBad(idProduct) {
    await this.findById(idProduct).then(
      value => {
        if (value) {
          value.bad++;
          this.productRepository.save(value).then(value1 => console.log(value1));
        } else {
          this.setOneBad(idProduct).then(value1 => console.log(value1));
        }
      },
    );
  }

  async subBad(idProduct) {
    await this.findById(idProduct).then(
      value => {
        if (value) {
          this.productRepository.update(value.idProduct,
            {
              idProduct: value.idProduct,
              love: value.love,
              bad: value.bad === 0 ? 0 : value.bad--,
              buy: value.buy,
            }).then(value1 => console.log(value1));
        } else {
          this.set(idProduct).then(value1 => console.log(value1));
        }
      },
    );
  }

  async addBuy(idProduct) {
    await this.findById(idProduct).then(
      value => {
        if (value) {
          value.buy++;
          this.productRepository.save(value).then(value1 => console.log(value1));
        } else {
          this.setOneBuy(idProduct).then(value1 => console.log(value1));
        }
      },
    );
  }

  async subBuy(idProduct) {
    await this.findById(idProduct).then(
      value => {
        if (value) {
          this.productRepository.update(value.idProduct,
            {
              idProduct: value.idProduct,
              love: value.love,
              bad: value.bad,
              buy: value.buy === 0 ? 0 : value.buy--,
            }).then(value1 => console.log(value1));
        } else {
          this.set(value.idProduct).then(value1 => console.log(value1));
        }
      },
    );
  }

}
