import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IngredientsEntity } from '../model/add-ingrdient.dto';

@Injectable()
export class IngredientsService {
  constructor(@InjectRepository(IngredientsEntity) private ingredientRepository: Repository<IngredientsEntity>) {
  }

  async getAllIngredient(): Promise<IngredientsEntity[]> {
    return await this.ingredientRepository.find();
  }

  async save(ingredient): Promise<IngredientsEntity> {
    return await this.ingredientRepository.save({ ingredient: ingredient });
  }
}
