import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const SALT_OR_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  try {
    return await bcrypt.hash(password, SALT_OR_ROUNDS);
  } catch {
    throw new InternalServerErrorException('Error hashing password');
  }
}
