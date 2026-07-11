import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { SalesOrder } from './entities/sales-order.entity';
import { SalesOrderItem } from './entities/sales-order-item.entity';
import { Invoice } from './entities/invoice.entity';
import { Payment } from './entities/payment.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(SalesOrder)
    private salesOrderRepository: Repository<SalesOrder>,
    @InjectRepository(SalesOrderItem)
    private salesOrderItemRepository: Repository<SalesOrderItem>,
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  // Customer Management
  async createCustomer(createCustomerDto: any) {
    const customer = this.customerRepository.create(createCustomerDto);
    return this.customerRepository.save(customer);
  }

  async findAllCustomers() {
    return this.customerRepository.find();
  }

  async findOneCustomer(id: string) {
    return this.customerRepository.findOne({ where: { id } });
  }

  async updateCustomer(id: string, updateCustomerDto: any) {
    await this.customerRepository.update(id, updateCustomerDto);
    return this.findOneCustomer(id);
  }

  // Sales Order Management
  async createSalesOrder(createOrderDto: any) {
    const order = this.salesOrderRepository.create(createOrderDto);
    return this.salesOrderRepository.save(order);
  }

  async findAllSalesOrders() {
    return this.salesOrderRepository.find();
  }

  async findOneSalesOrder(id: string) {
    return this.salesOrderRepository.findOne({ where: { id } });
  }

  async updateSalesOrder(id: string, updateOrderDto: any) {
    await this.salesOrderRepository.update(id, updateOrderDto);
    return this.findOneSalesOrder(id);
  }

  async getSalesOrdersByCustomer(customerId: string) {
    return this.salesOrderRepository.find({
      where: { customerId },
    });
  }

  // Sales Order Items
  async addSalesOrderItem(itemDto: any) {
    const item = this.salesOrderItemRepository.create(itemDto);
    return this.salesOrderItemRepository.save(item);
  }

  async getSalesOrderItems(salesOrderId: string) {
    return this.salesOrderItemRepository.find({
      where: { salesOrderId },
    });
  }

  // Invoice Management
  async createInvoice(createInvoiceDto: any) {
    const invoice = this.invoiceRepository.create(createInvoiceDto);
    return this.invoiceRepository.save(invoice);
  }

  async findAllInvoices() {
    return this.invoiceRepository.find();
  }

  async findOneInvoice(id: string) {
    return this.invoiceRepository.findOne({ where: { id } });
  }

  async getInvoicesByCustomer(customerId: string) {
    return this.invoiceRepository.find({
      where: { customerId },
    });
  }

  async updateInvoiceStatus(id: string, status: string) {
    await this.invoiceRepository.update(id, { status });
    return this.findOneInvoice(id);
  }

  // Payment Management
  async recordPayment(paymentDto: any) {
    const payment = this.paymentRepository.create(paymentDto);
    await this.paymentRepository.save(payment);

    // Update invoice status
    const invoice = await this.findOneInvoice(paymentDto.invoiceId);
    const newPaidAmount = (invoice.paidAmount || 0) + paymentDto.amount;
    let status = 'unpaid';

    if (newPaidAmount >= invoice.totalAmount) {
      status = 'paid';
    } else if (newPaidAmount > 0) {
      status = 'partial';
    }

    await this.invoiceRepository.update(paymentDto.invoiceId, {
      paidAmount: newPaidAmount,
      status,
    });

    return payment;
  }

  async getPaymentsByInvoice(invoiceId: string) {
    return this.paymentRepository.find({
      where: { invoiceId },
    });
  }

  async getPaymentsByCustomer(customerId: string) {
    return this.paymentRepository.find({
      where: { customerId },
    });
  }

  // Reports
  async getSalesReport(startDate: Date, endDate: Date) {
    return this.salesOrderRepository
      .createQueryBuilder('order')
      .where('order.orderDate BETWEEN :startDate AND :endDate', { startDate, endDate })
      .orderBy('order.orderDate', 'DESC')
      .getMany();
  }

  async getOverdueInvoices() {
    const today = new Date();
    return this.invoiceRepository.find({
      where: {
        dueDate: new Date(today.getTime() - 86400000),
        status: 'unpaid',
      },
    });
  }
}
