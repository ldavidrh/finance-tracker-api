import { Expense } from 'src/expenses/entities/expense.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column('boolean', {
    default: true,
  })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Expense, (expense) => expense.user)
  expenses: Expense[];
}
