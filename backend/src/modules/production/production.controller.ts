import { Controller, Get, Post, Body, Param, Put, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductionService } from './production.service';

@Controller('production')
@UseGuards(AuthGuard('jwt'))
export class ProductionController {
  constructor(private productionService: ProductionService) {}

  // Work Order Endpoints
  @Post('work-orders')
  async createWorkOrder(@Body() createWoDto: any) {
    return this.productionService.createWorkOrder(createWoDto);
  }

  @Get('work-orders')
  async findAllWorkOrders() {
    return this.productionService.findAllWorkOrders();
  }

  @Get('work-orders/:id')
  async findOneWorkOrder(@Param('id') id: string) {
    return this.productionService.findOneWorkOrder(id);
  }

  @Put('work-orders/:id')
  async updateWorkOrder(@Param('id') id: string, @Body() updateWoDto: any) {
    return this.productionService.updateWorkOrder(id, updateWoDto);
  }

  @Put('work-orders/:id/status')
  async updateWorkOrderStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.productionService.updateWorkOrderStatus(id, body.status);
  }

  // Production Line Endpoints
  @Post('lines')
  async createProductionLine(@Body() createLineDto: any) {
    return this.productionService.createProductionLine(createLineDto);
  }

  @Get('lines')
  async findAllProductionLines() {
    return this.productionService.findAllProductionLines();
  }

  @Get('lines/:id')
  async findOneProductionLine(@Param('id') id: string) {
    return this.productionService.findOneProductionLine(id);
  }

  @Put('lines/:id')
  async updateProductionLine(@Param('id') id: string, @Body() updateLineDto: any) {
    return this.productionService.updateProductionLine(id, updateLineDto);
  }

  // Production Logs Endpoints
  @Post('logs')
  async recordProductionLog(@Body() logDto: any) {
    return this.productionService.recordProductionLog(logDto);
  }

  @Get('work-orders/:workOrderId/logs')
  async getProductionLogsByWorkOrder(@Param('workOrderId') workOrderId: string) {
    return this.productionService.getProductionLogsByWorkOrder(workOrderId);
  }

  @Get('lines/:lineId/logs')
  async getProductionLogsByLine(@Param('lineId') lineId: string) {
    return this.productionService.getProductionLogsByLine(lineId);
  }

  // Reports
  @Get('reports/production')
  async getProductionReport(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.productionService.getProductionReport(new Date(startDate), new Date(endDate));
  }
}
