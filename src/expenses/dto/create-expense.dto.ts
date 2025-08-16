import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, isString } from 'class-validator';

export class CreateExpenseDto {
  @ApiProperty({ type: 'number', required: true, minimum: 0 })
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @ApiProperty({ type: 'string', required: true })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ type: 'string', required: true })
  @IsNotEmpty()
  @IsString()
  categoryId: string;
}
