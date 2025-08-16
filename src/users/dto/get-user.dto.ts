import { Expense } from 'src/expenses/entities/expense.entity';

export class GetUserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  expenses: Expense[];
}
