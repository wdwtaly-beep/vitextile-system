import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountingService } from './accounting.service';
import { AccountingController } from './accounting.controller';
import { ChartOfAccount } from './entities/chart-of-account.entity';
import { Journal } from './entities/journal.entity';
import { JournalEntry } from './entities/journal-entry.entity';
import { BalanceSheet } from './entities/balance-sheet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChartOfAccount, Journal, JournalEntry, BalanceSheet])],
  providers: [AccountingService],
  controllers: [AccountingController],
})
export class AccountingModule {}
