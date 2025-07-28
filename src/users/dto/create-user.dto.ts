import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({ required: true })
  password: string;
}
