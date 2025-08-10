import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateExpenseDto {
  @ApiProperty({ type: 'number', required: true, minimum: 0 })
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @ApiProperty({ type: 'number', required: true })
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
