import { Expense } from 'src/expenses/entities/expense.entity';

export class GetUserDto {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  expenses: Expense[];
}
