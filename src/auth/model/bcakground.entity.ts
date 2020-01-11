import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('background')
export class Background {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;
}
