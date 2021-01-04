import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('command')
export class CommandEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  number: string;

  @Column()
  status: string;

  @Column()
  date: number;

  @Column()
  price: number;

  @Column('simple-array')
  ingredients: string[];

  @Column('simple-array')
  idsProduct: string[];
}
