import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

export interface SignInResponse {
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private configService: ConfigService,
  ) {}

  async login(user: User): Promise<SignInResponse> {
    const payload = { sub: user.id, username: user.email };

    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async generateEmailConfirmationToken(sub: string, email: string) {
    const emailTokenExpiresIn = this.configService.get<string>(
      'JWT_EMAIL_CONFIRMATION_EXPIRES_IN',
    );
    return await this.jwtService.signAsync(
      {
        sub,
        email,
      },
      { expiresIn: emailTokenExpiresIn },
    );
  }

  async confirmEmailAddress(confirmation_token: string) {
    try {
      const payload = await this.jwtService.verifyAsync<{
        sub: string;
        email: string;
      }>(confirmation_token);

      if (!payload.sub || !payload.email) {
        throw new BadRequestException('Invalid confirmation token');
      }

      await this.userService.markUserEmailConfirmed(payload.sub);
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException(
          'Invalid or expired confirmation token',
        );
      }
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error confirming email address');
    }
  }
}
