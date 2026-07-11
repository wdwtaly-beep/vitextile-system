import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('suppliers')
export class Supplier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  supplierCode: string;

  @Column()
  supplierName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  province: string;

  @Column({ nullable: true })
  postalCode: string;

  @Column({ nullable: true })
  taxNumber: string;

  @Column({ default: 'active', enum: ['active', 'inactive', 'blocked'] })
  status: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  creditLimit: number;

  @Column({ nullable: true })
  paymentTerms: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
