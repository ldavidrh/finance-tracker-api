import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @IsNotEmpty()
  @ManyToOne(() => User, (user) => user.expenses, { nullable: false })
  user: User;
}
