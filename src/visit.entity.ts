import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('visit')
export class VisitEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numbers: number;

  @Column()
  lastVisit: number;
}
