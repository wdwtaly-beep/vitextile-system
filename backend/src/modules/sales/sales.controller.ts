import { Controller, Get, Post, Body, Param, Put, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SalesService } from './sales.service';

@Controller('sales')
@UseGuards(AuthGuard('jwt'))
export class SalesController {
  constructor(private salesService: SalesService) {}

  // Customer Endpoints
  @Post('customers')
  async createCustomer(@Body() createCustomerDto: any) {
    return this.salesService.createCustomer(createCustomerDto);
  }

  @Get('customers')
  async findAllCustomers() {
    return this.salesService.findAllCustomers();
  }

  @Get('customers/:id')
  async findOneCustomer(@Param('id') id: string) {
    return this.salesService.findOneCustomer(id);
  }

  @Put('customers/:id')
  async updateCustomer(@Param('id') id: string, @Body() updateCustomerDto: any) {
    return this.salesService.updateCustomer(id, updateCustomerDto);
  }

  // Sales Order Endpoints
  @Post('orders')
  async createSalesOrder(@Body() createOrderDto: any) {
    return this.salesService.createSalesOrder(createOrderDto);
  }

  @Get('orders')
  async findAllSalesOrders() {
    return this.salesService.findAllSalesOrders();
  }

  @Get('orders/:id')
  async findOneSalesOrder(@Param('id') id: string) {
    return this.salesService.findOneSalesOrder(id);
  }

  @Put('orders/:id')
  async updateSalesOrder(@Param('id') id: string, @Body() updateOrderDto: any) {
    return this.salesService.updateSalesOrder(id, updateOrderDto);
  }

  @Get('customers/:customerId/orders')
  async getSalesOrdersByCustomer(@Param('customerId') customerId: string) {
    return this.salesService.getSalesOrdersByCustomer(customerId);
  }

  // Sales Order Items Endpoints
  @Post('orders/:orderId/items')
  async addSalesOrderItem(@Param('orderId') orderId: string, @Body() itemDto: any) {
    return this.salesService.addSalesOrderItem({ ...itemDto, salesOrderId: orderId });
  }

  @Get('orders/:orderId/items')
  async getSalesOrderItems(@Param('orderId') orderId: string) {
    return this.salesService.getSalesOrderItems(orderId);
  }

  // Invoice Endpoints
  @Post('invoices')
  async createInvoice(@Body() createInvoiceDto: any) {
    return this.salesService.createInvoice(createInvoiceDto);
  }

  @Get('invoices')
  async findAllInvoices() {
    return this.salesService.findAllInvoices();
  }

  @Get('invoices/:id')
  async findOneInvoice(@Param('id') id: string) {
    return this.salesService.findOneInvoice(id);
  }

  @Get('customers/:customerId/invoices')
  async getInvoicesByCustomer(@Param('customerId') customerId: string) {
    return this.salesService.getInvoicesByCustomer(customerId);
  }

  // Payment Endpoints
  @Post('payments')
  async recordPayment(@Body() paymentDto: any) {
    return this.salesService.recordPayment(paymentDto);
  }

  @Get('invoices/:invoiceId/payments')
  async getPaymentsByInvoice(@Param('invoiceId') invoiceId: string) {
    return this.salesService.getPaymentsByInvoice(invoiceId);
  }

  @Get('customers/:customerId/payments')
  async getPaymentsByCustomer(@Param('customerId') customerId: string) {
    return this.salesService.getPaymentsByCustomer(customerId);
  }

  // Reports
  @Get('reports/sales')
  async getSalesReport(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.salesService.getSalesReport(new Date(startDate), new Date(endDate));
  }

  @Get('reports/overdue-invoices')
  async getOverdueInvoices() {
    return this.salesService.getOverdueInvoices();
  }
}
