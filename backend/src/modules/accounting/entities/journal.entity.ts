import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('journals')
export class Journal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  journalCode: string;

  @Column({ type: 'date' })
  journalDate: Date;

  @Column()
  description: string;

  @Column({ enum: ['sales', 'purchase', 'adjustment', 'transfer', 'expense'] })
  journalType: string;

  @Column({ default: 'draft', enum: ['draft', 'posted', 'reversed'] })
  status: string;

  @Column({ nullable: true })
  reference: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
