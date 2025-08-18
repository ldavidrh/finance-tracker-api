import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { UserCreatedListener } from './listeners/user-created.listener';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [EmailService, UserCreatedListener],
})
export class EmailModule {}
