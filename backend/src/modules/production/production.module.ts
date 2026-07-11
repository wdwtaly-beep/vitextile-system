import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionService } from './production.service';
import { ProductionController } from './production.controller';
import { WorkOrder } from './entities/work-order.entity';
import { ProductionLine } from './entities/production-line.entity';
import { ProductionLog } from './entities/production-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkOrder, ProductionLine, ProductionLog])],
  providers: [ProductionService],
  controllers: [ProductionController],
})
export class ProductionModule {}
