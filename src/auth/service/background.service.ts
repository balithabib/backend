import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Background } from '../model/bcakground.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';

@Injectable()
export class BackgroundService {
  constructor(@InjectRepository(Background) private backgroundRepository: Repository<Background>) {
  }

  async findById(id: number): Promise<Background> {
    return await this.backgroundRepository.findOne({
      where: {
        id,
      },
    });
  }

  async create(image: string): Promise<Background> {
    const background = new Background();
    background.image = image;
    return await this.backgroundRepository.save(background);
  }

  async setImages(files: any) {
    const response = [];
    for (const file of files) {
      fs.readFile('./' + file.path, 'binary', (err, data) => {
        const dataBase64 = Buffer.from(data, 'binary').toString('base64');
        this.create(dataBase64);
      });
      const fileResponse = {
        filename: file.filename,
      };
      response.push(fileResponse);
    }
    return response;
  }

  async getImage() {
    let randId;
    return await this.backgroundRepository.count().then(sizeBD => {
      randId = Math.round(Math.random() * (sizeBD - 1)) + 1;
      console.log(randId);
      return this.findById(randId);
    });
  }
}
