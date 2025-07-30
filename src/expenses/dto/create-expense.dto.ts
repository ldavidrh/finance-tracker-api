import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseDto {
  @ApiProperty({ type: 'number', required: true, minimum: 0 })
  value: number;
}
