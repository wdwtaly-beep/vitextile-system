import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('goods_receipts')
export class GoodsReceipt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  grNumber: string;

  @Column()
  purchaseOrderId: string;

  @Column()
  supplierId: string;

  @Column({ type: 'date' })
  receiptDate: Date;

  @Column({ nullable: true })
  receivedBy: string;

  @Column({ nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
