import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('ingredients')
export class IngredientsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ingredient: string;
}
