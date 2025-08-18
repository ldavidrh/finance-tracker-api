import { OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from 'src/users/events/user-created.event';
import { EmailService } from '../email.service';
import { Injectable } from '@nestjs/common';
import { Events } from 'src/shared/events';

@Injectable()
export class UserCreatedListener {
  constructor(private emailService: EmailService) {}

  @OnEvent(Events.USER_CREATED, { async: true })
  async handleUserCreatedEvent(payload: UserCreatedEvent) {
    await this.emailService.sendConfirmationEmail(payload);
  }
}
