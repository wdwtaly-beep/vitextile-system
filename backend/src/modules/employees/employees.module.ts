import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { Employee } from './entities/employee.entity';
import { Attendance } from './entities/attendance.entity';
import { Payroll } from './entities/payroll.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Attendance, Payroll])],
  providers: [EmployeesService],
  controllers: [EmployeesController],
})
export class EmployeesModule {}
