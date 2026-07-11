import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChartOfAccount } from './entities/chart-of-account.entity';
import { Journal } from './entities/journal.entity';
import { JournalEntry } from './entities/journal-entry.entity';
import { BalanceSheet } from './entities/balance-sheet.entity';

@Injectable()
export class AccountingService {
  constructor(
    @InjectRepository(ChartOfAccount)
    private chartOfAccountRepository: Repository<ChartOfAccount>,
    @InjectRepository(Journal)
    private journalRepository: Repository<Journal>,
    @InjectRepository(JournalEntry)
    private journalEntryRepository: Repository<JournalEntry>,
    @InjectRepository(BalanceSheet)
    private balanceSheetRepository: Repository<BalanceSheet>,
  ) {}

  // Chart of Accounts
  async createAccount(createAccountDto: any) {
    const account = this.chartOfAccountRepository.create(createAccountDto);
    return this.chartOfAccountRepository.save(account);
  }

  async findAllAccounts() {
    return this.chartOfAccountRepository.find();
  }

  async findOneAccount(id: string) {
    return this.chartOfAccountRepository.findOne({ where: { id } });
  }

  // Journals
  async createJournal(createJournalDto: any) {
    const journal = this.journalRepository.create(createJournalDto);
    return this.journalRepository.save(journal);
  }

  async findAllJournals() {
    return this.journalRepository.find();
  }

  async findOneJournal(id: string) {
    return this.journalRepository.findOne({ where: { id } });
  }

  async updateJournalStatus(id: string, status: string) {
    await this.journalRepository.update(id, { status });
    return this.findOneJournal(id);
  }

  // Journal Entries
  async addJournalEntry(entryDto: any) {
    const entry = this.journalEntryRepository.create(entryDto);
    return this.journalEntryRepository.save(entry);
  }

  async getJournalEntries(journalId: string) {
    return this.journalEntryRepository.find({
      where: { journalId },
    });
  }

  async getAccountBalance(accountId: string, startDate: Date, endDate: Date) {
    const entries = await this.journalEntryRepository
      .createQueryBuilder('entry')
      .innerJoinAndSelect('entry.journal', 'journal')
      .where('entry.accountId = :accountId', { accountId })
      .andWhere('journal.journalDate BETWEEN :startDate AND :endDate', { startDate, endDate })
      .getMany();

    let balance = 0;
    entries.forEach((entry) => {
      if (entry.type === 'debit') {
        balance += Number(entry.amount);
      } else {
        balance -= Number(entry.amount);
      }
    });

    return balance;
  }

  // Balance Sheet
  async generateBalanceSheet(reportDate: Date) {
    const bs = this.balanceSheetRepository.create({ reportDate });
    return this.balanceSheetRepository.save(bs);
  }

  async getBalanceSheet(id: string) {
    return this.balanceSheetRepository.findOne({ where: { id } });
  }

  async getBalanceSheets(startDate: Date, endDate: Date) {
    return this.balanceSheetRepository
      .createQueryBuilder('bs')
      .where('bs.reportDate BETWEEN :startDate AND :endDate', { startDate, endDate })
      .orderBy('bs.reportDate', 'DESC')
      .getMany();
  }
}
