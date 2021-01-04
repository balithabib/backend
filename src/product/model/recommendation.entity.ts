import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('recommendation')
export class RecommendationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idProduct: string;

  @Column()
  love: number;

  @Column()
  bad: number;

  @Column()
  buy: number;
}
