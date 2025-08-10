import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

export interface SignInResponse {
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: User): Promise<SignInResponse> {
    const payload = { sub: user.id, username: user.email };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
