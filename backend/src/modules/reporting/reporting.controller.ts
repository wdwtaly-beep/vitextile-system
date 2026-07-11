import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReportingService } from './reporting.service';

@Controller('reporting')
@UseGuards(AuthGuard('jwt'))
export class ReportingController {
  constructor(private reportingService: ReportingService) {}

  // Sales Report
  @Get('sales')
  async getSalesReport(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.reportingService.getSalesReportData(new Date(startDate), new Date(endDate));
  }

  // Inventory Report
  @Get('inventory')
  async getInventoryReport() {
    return this.reportingService.getInventoryReportData();
  }

  // Production Report
  @Get('production')
  async getProductionReport(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.reportingService.getProductionReportData(new Date(startDate), new Date(endDate));
  }

  // Financial Report
  @Get('financial')
  async getFinancialReport(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.reportingService.getFinancialReportData(new Date(startDate), new Date(endDate));
  }

  // Dashboard Summary
  @Get('dashboard')
  async getDashboardSummary() {
    return this.reportingService.getDashboardSummary();
  }

  // Customer Report
  @Get('customers')
  async getCustomerReport() {
    return this.reportingService.getCustomerReportData();
  }

  // Supplier Report
  @Get('suppliers')
  async getSupplierReport() {
    return this.reportingService.getSupplierReportData();
  }
}
