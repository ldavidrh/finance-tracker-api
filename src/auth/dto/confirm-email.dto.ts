import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty } from 'class-validator';

export class ConfirmEmailDto {
  @ApiProperty({
    description: 'JWT Token used to confirm user email',
    type: 'string',
  })
  @IsNotEmpty()
  @IsJWT()
  token: string;
}
