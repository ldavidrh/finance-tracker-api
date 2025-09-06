import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('UsersController', () => {
  let controller: UsersController;
  const mockUserService = {};
  const mockEventEmitter = { emit: jest.fn() };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockUserService },
        { provide: EventEmitter2, useValue: mockEventEmitter },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
