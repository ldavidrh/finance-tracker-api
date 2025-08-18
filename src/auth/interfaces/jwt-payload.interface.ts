export interface EmailConfirmationPayload {
  sub: string;
  email: string;
}

export interface AccessTokenPayload {
  sub: string;
  username: string;
}
