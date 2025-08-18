import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hashPassword } from '../shared/utils';
import { GetUserDto } from './dto/get-user.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserCreatedEvent } from './events/user-created.event';
import { Events } from 'src/shared/events';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;

    const hashedPassword = await hashPassword(password);

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    try {
      await this.userRepository.save(user);

      const userCreatedEvent = new UserCreatedEvent(
        user.id,
        user.firstName,
        user.lastName,
        user.email,
      );

      this.eventEmitter.emit(Events.USER_CREATED, userCreatedEvent);
    } catch {
      throw new ConflictException('User already exists');
    }
  }

  async findAll(): Promise<GetUserDto[]> {
    const users = await this.userRepository.find();

    return users.map((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user;
      return {
        ...rest,
      };
    });
  }

  findOne(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.delete({ id });
  }

  async markUserEmailConfirmed(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    user.emailConfirmed = true;

    await this.userRepository.save(user);
  }
}
