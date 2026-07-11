import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QualityControlService } from './quality-control.service';
import { QualityControlController } from './quality-control.controller';
import { QualityCheck } from './entities/quality-check.entity';
import { QualityStandard } from './entities/quality-standard.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QualityCheck, QualityStandard])],
  providers: [QualityControlService],
  controllers: [QualityControlController],
})
export class QualityControlModule {}
