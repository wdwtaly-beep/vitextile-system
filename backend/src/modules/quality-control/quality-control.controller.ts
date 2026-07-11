import { Controller, Get, Post, Body, Param, Put, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { QualityControlService } from './quality-control.service';

@Controller('quality-control')
@UseGuards(AuthGuard('jwt'))
export class QualityControlController {
  constructor(private qualityControlService: QualityControlService) {}

  // Quality Checks Endpoints
  @Post('checks')
  async recordQualityCheck(@Body() checkDto: any) {
    return this.qualityControlService.recordQualityCheck(checkDto);
  }

  @Get('checks')
  async findAllQualityChecks() {
    return this.qualityControlService.findAllQualityChecks();
  }

  @Get('checks/:id')
  async findOneQualityCheck(@Param('id') id: string) {
    return this.qualityControlService.findOneQualityCheck(id);
  }

  @Get('production-logs/:productionLogId/checks')
  async getQualityChecksByProductionLog(@Param('productionLogId') productionLogId: string) {
    return this.qualityControlService.getQualityChecksByProductionLog(productionLogId);
  }

  // Quality Standards Endpoints
  @Post('standards')
  async createQualityStandard(@Body() createStandardDto: any) {
    return this.qualityControlService.createQualityStandard(createStandardDto);
  }

  @Get('standards')
  async findAllQualityStandards() {
    return this.qualityControlService.findAllQualityStandards();
  }

  @Get('standards/:id')
  async findOneQualityStandard(@Param('id') id: string) {
    return this.qualityControlService.findOneQualityStandard(id);
  }

  @Put('standards/:id')
  async updateQualityStandard(@Param('id') id: string, @Body() updateStandardDto: any) {
    return this.qualityControlService.updateQualityStandard(id, updateStandardDto);
  }

  @Get('products/:productId/standards')
  async getQualityStandardsByProduct(@Param('productId') productId: string) {
    return this.qualityControlService.getQualityStandardsByProduct(productId);
  }

  // Reports
  @Get('reports/quality')
  async getQualityReport(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.qualityControlService.getQualityReport(new Date(startDate), new Date(endDate));
  }
}
