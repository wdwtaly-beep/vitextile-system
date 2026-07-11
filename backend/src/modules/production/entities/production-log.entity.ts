import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('production_logs')
export class ProductionLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  workOrderId: string;

  @Column()
  productionLineId: string;

  @Column({ type: 'date' })
  logDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  quantityProduced: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  wastagePercentage: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  quantityDefective: number;

  @Column({ nullable: true })
  operatorName: string;

  @Column({ nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
