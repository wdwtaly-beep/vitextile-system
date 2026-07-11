import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EmployeesService } from './employees.service';

@Controller('employees')
@UseGuards(AuthGuard('jwt'))
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  // Employee Endpoints
  @Post()
  async create(@Body() createEmployeeDto: any) {
    return this.employeesService.createEmployee(createEmployeeDto);
  }

  @Get()
  async findAll() {
    return this.employeesService.findAllEmployees();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.employeesService.findOneEmployee(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateEmployeeDto: any) {
    return this.employeesService.updateEmployee(id, updateEmployeeDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.employeesService.deleteEmployee(id);
  }

  // Attendance Endpoints
  @Post('attendance/record')
  async recordAttendance(@Body() attendanceDto: any) {
    return this.employeesService.recordAttendance(attendanceDto);
  }

  @Get(':employeeId/attendance/:month')
  async getAttendance(@Param('employeeId') employeeId: string, @Param('month') month: string) {
    return this.employeesService.getEmployeeAttendance(employeeId, month);
  }

  // Payroll Endpoints
  @Post('payroll/calculate')
  async calculatePayroll(@Body() body: { employeeId: string; payrollMonth: string }) {
    return this.employeesService.calculatePayroll(body.employeeId, body.payrollMonth);
  }

  @Get(':employeeId/payroll/history')
  async getPayrollHistory(@Param('employeeId') employeeId: string) {
    return this.employeesService.getPayrollHistory(employeeId);
  }
}
