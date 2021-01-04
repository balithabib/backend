import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  size: string;

  @Column()
  price: string;

  @Column()
  quantity: number;

  @Column('simple-array')
  description: string[];

  @Column('simple-array')
  images: string[];
}
