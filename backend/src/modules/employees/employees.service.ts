import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { Attendance } from './entities/attendance.entity';
import { Payroll } from './entities/payroll.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
    @InjectRepository(Payroll)
    private payrollRepository: Repository<Payroll>,
  ) {}

  // Employee Management
  async createEmployee(createEmployeeDto: any) {
    const employee = this.employeesRepository.create(createEmployeeDto);
    return this.employeesRepository.save(employee);
  }

  async findAllEmployees() {
    return this.employeesRepository.find();
  }

  async findOneEmployee(id: string) {
    return this.employeesRepository.findOne({ where: { id } });
  }

  async updateEmployee(id: string, updateEmployeeDto: any) {
    await this.employeesRepository.update(id, updateEmployeeDto);
    return this.findOneEmployee(id);
  }

  async deleteEmployee(id: string) {
    return this.employeesRepository.delete(id);
  }

  // Attendance Management
  async recordAttendance(attendanceDto: any) {
    const attendance = this.attendanceRepository.create(attendanceDto);
    return this.attendanceRepository.save(attendance);
  }

  async getEmployeeAttendance(employeeId: string, month: string) {
    return this.attendanceRepository.find({
      where: { employeeId },
    });
  }

  // Payroll Management
  async calculatePayroll(employeeId: string, payrollMonth: string) {
    const employee = await this.findOneEmployee(employeeId);
    const attendance = await this.getEmployeeAttendance(employeeId, payrollMonth);

    const baseSalary = employee.baseSalary;
    const workDays = attendance.length;
    const overtime = 0; // Calculated based on attendance
    const bonus = 0; // To be set manually
    const deductions = 0; // Calculated based on leaves, etc.

    const netSalary = baseSalary + overtime + bonus - deductions;

    const payroll = this.payrollRepository.create({
      employeeId,
      payrollMonth,
      baseSalary,
      overtime,
      bonus,
      deductions,
      netSalary,
    });

    return this.payrollRepository.save(payroll);
  }

  async getPayrollHistory(employeeId: string) {
    return this.payrollRepository.find({
      where: { employeeId },
    });
  }
}
