import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Stock } from './entities/stock.entity';
import { StockMovement } from './entities/stock-movement.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
    @InjectRepository(StockMovement)
    private stockMovementRepository: Repository<StockMovement>,
  ) {}

  // Product Management
  async createProduct(createProductDto: any) {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async findAllProducts() {
    return this.productRepository.find();
  }

  async findOneProduct(id: string) {
    return this.productRepository.findOne({ where: { id } });
  }

  async updateProduct(id: string, updateProductDto: any) {
    await this.productRepository.update(id, updateProductDto);
    return this.findOneProduct(id);
  }

  // Stock Management
  async getStockByWarehouse(productId: string, warehouse: string) {
    return this.stockRepository.findOne({
      where: { productId, warehouse },
    });
  }

  async getAllStock() {
    return this.stockRepository.find();
  }

  async updateStock(productId: string, warehouse: string, quantity: number) {
    let stock = await this.getStockByWarehouse(productId, warehouse);
    
    if (!stock) {
      stock = this.stockRepository.create({
        productId,
        warehouse,
        quantity,
        available: quantity,
      });
    } else {
      stock.quantity = quantity;
      stock.available = quantity - (stock.reserved || 0);
    }

    return this.stockRepository.save(stock);
  }

  // Stock Movements
  async recordMovement(movementDto: any) {
    const movement = this.stockMovementRepository.create(movementDto);
    await this.stockMovementRepository.save(movement);

    // Update stock based on movement type
    const stock = await this.getStockByWarehouse(movementDto.productId, movementDto.warehouse);
    let newQuantity = stock?.quantity || 0;

    if (movementDto.type === 'in') {
      newQuantity += movementDto.quantity;
    } else if (movementDto.type === 'out') {
      newQuantity -= movementDto.quantity;
    } else if (movementDto.type === 'adjustment') {
      newQuantity = movementDto.quantity;
    }

    await this.updateStock(movementDto.productId, movementDto.warehouse, newQuantity);

    return movement;
  }

  async getMovementHistory(productId: string) {
    return this.stockMovementRepository.find({
      where: { productId },
    });
  }

  async getStockMovements(startDate: Date, endDate: Date) {
    return this.stockMovementRepository
      .createQueryBuilder('movement')
      .where('movement.createdAt BETWEEN :startDate AND :endDate', { startDate, endDate })
      .orderBy('movement.createdAt', 'DESC')
      .getMany();
  }

  // Low Stock Alert
  async getLowStockProducts() {
    const products = await this.productRepository.find();
    const lowStockProducts = [];

    for (const product of products) {
      const stock = await this.stockRepository.find({
        where: { productId: product.id },
      });

      const totalStock = stock.reduce((sum, s) => sum + s.available, 0);
      if (totalStock <= product.minimumStock) {
        lowStockProducts.push({
          product,
          totalStock,
          minimumStock: product.minimumStock,
        });
      }
    }

    return lowStockProducts;
  }
}
