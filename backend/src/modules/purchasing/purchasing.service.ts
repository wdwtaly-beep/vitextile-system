import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './entities/supplier.entity';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { PurchaseOrderItem } from './entities/purchase-order-item.entity';
import { GoodsReceipt } from './entities/goods-receipt.entity';

@Injectable()
export class PurchasingService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
    @InjectRepository(PurchaseOrder)
    private purchaseOrderRepository: Repository<PurchaseOrder>,
    @InjectRepository(PurchaseOrderItem)
    private purchaseOrderItemRepository: Repository<PurchaseOrderItem>,
    @InjectRepository(GoodsReceipt)
    private goodsReceiptRepository: Repository<GoodsReceipt>,
  ) {}

  // Supplier Management
  async createSupplier(createSupplierDto: any) {
    const supplier = this.supplierRepository.create(createSupplierDto);
    return this.supplierRepository.save(supplier);
  }

  async findAllSuppliers() {
    return this.supplierRepository.find();
  }

  async findOneSupplier(id: string) {
    return this.supplierRepository.findOne({ where: { id } });
  }

  async updateSupplier(id: string, updateSupplierDto: any) {
    await this.supplierRepository.update(id, updateSupplierDto);
    return this.findOneSupplier(id);
  }

  // Purchase Order Management
  async createPurchaseOrder(createPoDto: any) {
    const po = this.purchaseOrderRepository.create(createPoDto);
    return this.purchaseOrderRepository.save(po);
  }

  async findAllPurchaseOrders() {
    return this.purchaseOrderRepository.find();
  }

  async findOnePurchaseOrder(id: string) {
    return this.purchaseOrderRepository.findOne({ where: { id } });
  }

  async updatePurchaseOrder(id: string, updatePoDto: any) {
    await this.purchaseOrderRepository.update(id, updatePoDto);
    return this.findOnePurchaseOrder(id);
  }

  async getPurchaseOrdersBySupplier(supplierId: string) {
    return this.purchaseOrderRepository.find({
      where: { supplierId },
    });
  }

  // Purchase Order Items
  async addPurchaseOrderItem(itemDto: any) {
    const item = this.purchaseOrderItemRepository.create(itemDto);
    return this.purchaseOrderItemRepository.save(item);
  }

  async getPurchaseOrderItems(purchaseOrderId: string) {
    return this.purchaseOrderItemRepository.find({
      where: { purchaseOrderId },
    });
  }

  // Goods Receipt
  async createGoodsReceipt(createGrDto: any) {
    const gr = this.goodsReceiptRepository.create(createGrDto);
    return this.goodsReceiptRepository.save(gr);
  }

  async findAllGoodsReceipts() {
    return this.goodsReceiptRepository.find();
  }

  async findOneGoodsReceipt(id: string) {
    return this.goodsReceiptRepository.findOne({ where: { id } });
  }

  async getGoodsReceiptsByPo(purchaseOrderId: string) {
    return this.goodsReceiptRepository.find({
      where: { purchaseOrderId },
    });
  }

  // Reports
  async getPurchasingReport(startDate: Date, endDate: Date) {
    return this.purchaseOrderRepository
      .createQueryBuilder('po')
      .where('po.orderDate BETWEEN :startDate AND :endDate', { startDate, endDate })
      .orderBy('po.orderDate', 'DESC')
      .getMany();
  }
}
