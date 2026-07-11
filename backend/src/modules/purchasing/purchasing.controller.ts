import { Controller, Get, Post, Body, Param, Put, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PurchasingService } from './purchasing.service';

@Controller('purchasing')
@UseGuards(AuthGuard('jwt'))
export class PurchasingController {
  constructor(private purchasingService: PurchasingService) {}

  // Supplier Endpoints
  @Post('suppliers')
  async createSupplier(@Body() createSupplierDto: any) {
    return this.purchasingService.createSupplier(createSupplierDto);
  }

  @Get('suppliers')
  async findAllSuppliers() {
    return this.purchasingService.findAllSuppliers();
  }

  @Get('suppliers/:id')
  async findOneSupplier(@Param('id') id: string) {
    return this.purchasingService.findOneSupplier(id);
  }

  @Put('suppliers/:id')
  async updateSupplier(@Param('id') id: string, @Body() updateSupplierDto: any) {
    return this.purchasingService.updateSupplier(id, updateSupplierDto);
  }

  // Purchase Order Endpoints
  @Post('purchase-orders')
  async createPurchaseOrder(@Body() createPoDto: any) {
    return this.purchasingService.createPurchaseOrder(createPoDto);
  }

  @Get('purchase-orders')
  async findAllPurchaseOrders() {
    return this.purchasingService.findAllPurchaseOrders();
  }

  @Get('purchase-orders/:id')
  async findOnePurchaseOrder(@Param('id') id: string) {
    return this.purchasingService.findOnePurchaseOrder(id);
  }

  @Put('purchase-orders/:id')
  async updatePurchaseOrder(@Param('id') id: string, @Body() updatePoDto: any) {
    return this.purchasingService.updatePurchaseOrder(id, updatePoDto);
  }

  @Get('suppliers/:supplierId/purchase-orders')
  async getPurchaseOrdersBySupplier(@Param('supplierId') supplierId: string) {
    return this.purchasingService.getPurchaseOrdersBySupplier(supplierId);
  }

  // Purchase Order Items
  @Post('purchase-orders/:poId/items')
  async addPurchaseOrderItem(@Param('poId') poId: string, @Body() itemDto: any) {
    return this.purchasingService.addPurchaseOrderItem({ ...itemDto, purchaseOrderId: poId });
  }

  @Get('purchase-orders/:poId/items')
  async getPurchaseOrderItems(@Param('poId') poId: string) {
    return this.purchasingService.getPurchaseOrderItems(poId);
  }

  // Goods Receipt Endpoints
  @Post('goods-receipts')
  async createGoodsReceipt(@Body() createGrDto: any) {
    return this.purchasingService.createGoodsReceipt(createGrDto);
  }

  @Get('goods-receipts')
  async findAllGoodsReceipts() {
    return this.purchasingService.findAllGoodsReceipts();
  }

  @Get('goods-receipts/:id')
  async findOneGoodsReceipt(@Param('id') id: string) {
    return this.purchasingService.findOneGoodsReceipt(id);
  }

  @Get('purchase-orders/:poId/goods-receipts')
  async getGoodsReceiptsByPo(@Param('poId') poId: string) {
    return this.purchasingService.getGoodsReceiptsByPo(poId);
  }

  // Reports
  @Get('reports/purchasing')
  async getPurchasingReport(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.purchasingService.getPurchasingReport(new Date(startDate), new Date(endDate));
  }
}
