import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({ required: true })
  password: string;
}
