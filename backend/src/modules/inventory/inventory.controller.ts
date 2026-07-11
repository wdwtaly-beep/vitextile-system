import { Controller, Get, Post, Body, Param, Put, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InventoryService } from './inventory.service';

@Controller('inventory')
@UseGuards(AuthGuard('jwt'))
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  // Product Endpoints
  @Post('products')
  async createProduct(@Body() createProductDto: any) {
    return this.inventoryService.createProduct(createProductDto);
  }

  @Get('products')
  async findAllProducts() {
    return this.inventoryService.findAllProducts();
  }

  @Get('products/:id')
  async findOneProduct(@Param('id') id: string) {
    return this.inventoryService.findOneProduct(id);
  }

  @Put('products/:id')
  async updateProduct(@Param('id') id: string, @Body() updateProductDto: any) {
    return this.inventoryService.updateProduct(id, updateProductDto);
  }

  // Stock Endpoints
  @Get('stock')
  async getAllStock() {
    return this.inventoryService.getAllStock();
  }

  @Get('stock/:productId/:warehouse')
  async getStockByWarehouse(@Param('productId') productId: string, @Param('warehouse') warehouse: string) {
    return this.inventoryService.getStockByWarehouse(productId, warehouse);
  }

  @Put('stock/:productId/:warehouse')
  async updateStock(
    @Param('productId') productId: string,
    @Param('warehouse') warehouse: string,
    @Body() body: { quantity: number },
  ) {
    return this.inventoryService.updateStock(productId, warehouse, body.quantity);
  }

  // Stock Movement Endpoints
  @Post('movements')
  async recordMovement(@Body() movementDto: any) {
    return this.inventoryService.recordMovement(movementDto);
  }

  @Get('movements/product/:productId')
  async getMovementHistory(@Param('productId') productId: string) {
    return this.inventoryService.getMovementHistory(productId);
  }

  @Get('movements/range')
  async getStockMovements(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.inventoryService.getStockMovements(new Date(startDate), new Date(endDate));
  }

  // Low Stock Alert
  @Get('alerts/low-stock')
  async getLowStockProducts() {
    return this.inventoryService.getLowStockProducts();
  }
}
