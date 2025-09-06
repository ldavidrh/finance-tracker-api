import { Controller, Post, Query, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { ApiBody } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';
import { ConfirmEmailDto } from './dto/confirm-email.dto';
import { SkipAuth } from 'src/shared/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: SignInDto })
  login(@Request() req: Request & { user: User }) {
    return this.authService.login(req.user);
  }

  @Post('confirm-email')
  async confirmEmail(@Query() confirmEmailDto: ConfirmEmailDto) {
    await this.authService.confirmEmailAddress(confirmEmailDto.token);
    return { message: 'Email confirmed successfully' };
  }
}
