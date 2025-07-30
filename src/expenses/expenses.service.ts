import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense) private expenseRepository: Repository<Expense>,
  ) {}

  create(createExpenseDto: CreateExpenseDto) {
    return this.expenseRepository.save(createExpenseDto);
  }

  findAll() {
    return this.expenseRepository.find();
  }

  findOne(id: string) {
    return this.expenseRepository.findOneBy({ id });
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return this.expenseRepository.update(id, updateExpenseDto);
  }

  remove(id: string) {
    return this.expenseRepository.delete({ id });
  }
}
