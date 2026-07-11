import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkOrder } from './entities/work-order.entity';
import { ProductionLine } from './entities/production-line.entity';
import { ProductionLog } from './entities/production-log.entity';

@Injectable()
export class ProductionService {
  constructor(
    @InjectRepository(WorkOrder)
    private workOrderRepository: Repository<WorkOrder>,
    @InjectRepository(ProductionLine)
    private productionLineRepository: Repository<ProductionLine>,
    @InjectRepository(ProductionLog)
    private productionLogRepository: Repository<ProductionLog>,
  ) {}

  // Work Order Management
  async createWorkOrder(createWoDto: any) {
    const wo = this.workOrderRepository.create(createWoDto);
    return this.workOrderRepository.save(wo);
  }

  async findAllWorkOrders() {
    return this.workOrderRepository.find();
  }

  async findOneWorkOrder(id: string) {
    return this.workOrderRepository.findOne({ where: { id } });
  }

  async updateWorkOrder(id: string, updateWoDto: any) {
    await this.workOrderRepository.update(id, updateWoDto);
    return this.findOneWorkOrder(id);
  }

  async updateWorkOrderStatus(id: string, status: string) {
    await this.workOrderRepository.update(id, { status });
    return this.findOneWorkOrder(id);
  }

  // Production Line Management
  async createProductionLine(createLineDto: any) {
    const line = this.productionLineRepository.create(createLineDto);
    return this.productionLineRepository.save(line);
  }

  async findAllProductionLines() {
    return this.productionLineRepository.find();
  }

  async findOneProductionLine(id: string) {
    return this.productionLineRepository.findOne({ where: { id } });
  }

  async updateProductionLine(id: string, updateLineDto: any) {
    await this.productionLineRepository.update(id, updateLineDto);
    return this.findOneProductionLine(id);
  }

  // Production Logs
  async recordProductionLog(logDto: any) {
    const log = this.productionLogRepository.create(logDto);
    return this.productionLogRepository.save(log);
  }

  async getProductionLogsByWorkOrder(workOrderId: string) {
    return this.productionLogRepository.find({
      where: { workOrderId },
    });
  }

  async getProductionLogsByLine(productionLineId: string) {
    return this.productionLogRepository.find({
      where: { productionLineId },
    });
  }

  async getProductionLogsDateRange(startDate: Date, endDate: Date) {
    return this.productionLogRepository
      .createQueryBuilder('log')
      .where('log.logDate BETWEEN :startDate AND :endDate', { startDate, endDate })
      .orderBy('log.logDate', 'DESC')
      .getMany();
  }

  // Reports
  async getProductionReport(startDate: Date, endDate: Date) {
    const logs = await this.getProductionLogsDateRange(startDate, endDate);
    const totalProduced = logs.reduce((sum, log) => sum + Number(log.quantityProduced), 0);
    const totalDefective = logs.reduce((sum, log) => sum + Number(log.quantityDefective), 0);
    const totalWastage = logs.reduce((sum, log) => sum + Number(log.quantityProduced) * (Number(log.wastagePercentage) / 100), 0);

    return {
      totalProduced,
      totalDefective,
      totalWastage,
      defectivePercentage: (totalDefective / totalProduced) * 100 || 0,
      logs,
    };
  }
}
