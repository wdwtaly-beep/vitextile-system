import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('production_lines')
export class ProductionLine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  lineCode: string;

  @Column()
  lineName: string;

  @Column()
  capacity: number;

  @Column({ default: 'active', enum: ['active', 'maintenance', 'inactive'] })
  status: string;

  @Column({ nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
