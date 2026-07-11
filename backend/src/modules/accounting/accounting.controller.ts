import { Controller, Get, Post, Body, Param, Put, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountingService } from './accounting.service';

@Controller('accounting')
@UseGuards(AuthGuard('jwt'))
export class AccountingController {
  constructor(private accountingService: AccountingService) {}

  // Chart of Accounts Endpoints
  @Post('accounts')
  async createAccount(@Body() createAccountDto: any) {
    return this.accountingService.createAccount(createAccountDto);
  }

  @Get('accounts')
  async findAllAccounts() {
    return this.accountingService.findAllAccounts();
  }

  @Get('accounts/:id')
  async findOneAccount(@Param('id') id: string) {
    return this.accountingService.findOneAccount(id);
  }

  // Journal Endpoints
  @Post('journals')
  async createJournal(@Body() createJournalDto: any) {
    return this.accountingService.createJournal(createJournalDto);
  }

  @Get('journals')
  async findAllJournals() {
    return this.accountingService.findAllJournals();
  }

  @Get('journals/:id')
  async findOneJournal(@Param('id') id: string) {
    return this.accountingService.findOneJournal(id);
  }

  @Put('journals/:id/status')
  async updateJournalStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.accountingService.updateJournalStatus(id, body.status);
  }

  // Journal Entries Endpoints
  @Post('journals/:journalId/entries')
  async addJournalEntry(@Param('journalId') journalId: string, @Body() entryDto: any) {
    return this.accountingService.addJournalEntry({ ...entryDto, journalId });
  }

  @Get('journals/:journalId/entries')
  async getJournalEntries(@Param('journalId') journalId: string) {
    return this.accountingService.getJournalEntries(journalId);
  }

  @Get('accounts/:accountId/balance')
  async getAccountBalance(
    @Param('accountId') accountId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.accountingService.getAccountBalance(accountId, new Date(startDate), new Date(endDate));
  }

  // Balance Sheet Endpoints
  @Post('balance-sheets')
  async generateBalanceSheet(@Body() body: { reportDate: string }) {
    return this.accountingService.generateBalanceSheet(new Date(body.reportDate));
  }

  @Get('balance-sheets/:id')
  async getBalanceSheet(@Param('id') id: string) {
    return this.accountingService.getBalanceSheet(id);
  }

  @Get('balance-sheets')
  async getBalanceSheets(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.accountingService.getBalanceSheets(new Date(startDate), new Date(endDate));
  }
}
