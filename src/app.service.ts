import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VisitEntity } from './visit.entity';

@Injectable()
export class AppService {

  constructor(@InjectRepository(VisitEntity) private visitRepository: Repository<VisitEntity>) {
  }

  getHello(): string {
    return 'Hello World!';
  }

  async incrementVisit() {
    return await new Promise((resolve) => {
      this.findById(1).then(value => {
        if (value) {
          console.log(value);
          const numbers = value.numbers++;
          return this.visitRepository
            .update(1, { id: 1, numbers: value.numbers++, lastVisit: Date.now() })
            .then(r => resolve(numbers));
        }
        return this.visitRepository.save({ id: 1, numbers: 0, lastVisit: Date.now() }).then(value1 => resolve(0));
      });
    });
  }

  async findById(id: number): Promise<VisitEntity> {
    return await this.visitRepository.findOne(id);
  }
}
