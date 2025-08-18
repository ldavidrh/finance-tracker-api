import { Injectable, Logger } from '@nestjs/common';
import { env } from 'process';
import { AuthService } from 'src/auth/auth.service';
import { UserCreatedEvent } from 'src/users/events/user-created.event';

@Injectable()
export class EmailService {
  private logger = new Logger();

  constructor(private authService: AuthService) {}

  async sendConfirmationEmail(userCreatedEvent: UserCreatedEvent) {
    try {
      const emailConfirmationToken =
        await this.authService.generateEmailConfirmationToken(
          userCreatedEvent.id,
          userCreatedEvent.email,
        );

      // TODO implement logic to use a email provider to actually send confirmation emails
      if (process.env.NODE_ENV !== 'production') {
        this.logger.log(
          `Sending account confirmation email to ${userCreatedEvent.email} with token ${emailConfirmationToken}`,
          'EmailService',
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `Failed to send confirmation email for user ${userCreatedEvent.id}`,
        );
      }
    }
  }
}
