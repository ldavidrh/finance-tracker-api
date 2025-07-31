import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true, type: 'string' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true, type: 'string' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ required: true, type: 'string' })
  @IsNotEmpty()
  password: string;
}
