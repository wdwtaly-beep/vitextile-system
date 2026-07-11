import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('balance_sheets')
export class BalanceSheet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  reportDate: Date;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  totalAssets: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  totalLiabilities: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  totalEquity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
