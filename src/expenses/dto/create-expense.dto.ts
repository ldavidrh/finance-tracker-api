import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseDto {
  @ApiProperty({ type: 'number', required: true })
  value: number;
}
