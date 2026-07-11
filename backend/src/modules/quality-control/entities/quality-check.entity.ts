import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('quality_checks')
export class QualityCheck {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productionLogId: string;

  @Column({ type: 'date' })
  checkDate: Date;

  @Column()
  checkedBy: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  sampleSize: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  defectiveCount: number;

  @Column({ default: 'pass', enum: ['pass', 'fail', 'conditional'] })
  result: string;

  @Column({ nullable: true })
  remarks: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
