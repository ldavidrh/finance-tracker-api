import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const jwtSecret = configService.get<string>('JWT_SECRET')!;

    super({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken() as JwtFromRequestFunction<Request>,
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  validate(payload: { sub: string; username: string }) {
    return { userId: payload.sub, username: payload.username };
  }
}
