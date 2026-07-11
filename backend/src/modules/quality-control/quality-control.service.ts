import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QualityCheck } from './entities/quality-check.entity';
import { QualityStandard } from './entities/quality-standard.entity';

@Injectable()
export class QualityControlService {
  constructor(
    @InjectRepository(QualityCheck)
    private qualityCheckRepository: Repository<QualityCheck>,
    @InjectRepository(QualityStandard)
    private qualityStandardRepository: Repository<QualityStandard>,
  ) {}

  // Quality Checks
  async recordQualityCheck(checkDto: any) {
    const check = this.qualityCheckRepository.create(checkDto);
    return this.qualityCheckRepository.save(check);
  }

  async findAllQualityChecks() {
    return this.qualityCheckRepository.find();
  }

  async findOneQualityCheck(id: string) {
    return this.qualityCheckRepository.findOne({ where: { id } });
  }

  async getQualityChecksByProductionLog(productionLogId: string) {
    return this.qualityCheckRepository.find({
      where: { productionLogId },
    });
  }

  // Quality Standards
  async createQualityStandard(createStandardDto: any) {
    const standard = this.qualityStandardRepository.create(createStandardDto);
    return this.qualityStandardRepository.save(standard);
  }

  async findAllQualityStandards() {
    return this.qualityStandardRepository.find();
  }

  async findOneQualityStandard(id: string) {
    return this.qualityStandardRepository.findOne({ where: { id } });
  }

  async updateQualityStandard(id: string, updateStandardDto: any) {
    await this.qualityStandardRepository.update(id, updateStandardDto);
    return this.findOneQualityStandard(id);
  }

  async getQualityStandardsByProduct(productId: string) {
    return this.qualityStandardRepository.find({
      where: { productId },
    });
  }

  // Quality Reports
  async getQualityReport(startDate: Date, endDate: Date) {
    const checks = await this.qualityCheckRepository
      .createQueryBuilder('check')
      .where('check.checkDate BETWEEN :startDate AND :endDate', { startDate, endDate })
      .orderBy('check.checkDate', 'DESC')
      .getMany();

    const totalChecks = checks.length;
    const passedChecks = checks.filter((c) => c.result === 'pass').length;
    const failedChecks = checks.filter((c) => c.result === 'fail').length;
    const passRate = totalChecks > 0 ? (passedChecks / totalChecks) * 100 : 0;

    return {
      totalChecks,
      passedChecks,
      failedChecks,
      passRate,
      checks,
    };
  }
}
