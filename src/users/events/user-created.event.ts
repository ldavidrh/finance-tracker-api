export class UserCreatedEvent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  constructor(
    userId: string,
    firstName: string,
    lastName: string,
    email: string,
  ) {
    this.id = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`.trim();
  }
}
