import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stock: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column()
  price: string;

  @Column('simple-array')
  comment: string[];

  @Column('simple-array')
  thumbnails: string[];
}
