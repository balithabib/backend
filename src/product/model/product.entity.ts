import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class ProductEntity {
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
