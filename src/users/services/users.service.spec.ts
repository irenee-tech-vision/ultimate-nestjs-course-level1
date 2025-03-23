import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigService } from '../../app-config/app-config.service';
import { HashingService } from '../../hashing/hashing.service';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { CreateUserDto } from '../controllers/dto/create-user.dto';
import { UserModel } from './models/user.model';
import { ValidationError } from '../../common/exceptions/validation-error';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: DeepMocked<UsersRepository>;
  let appConfigService = createMock<AppConfigService>({
    get defaultLimit() {
      return 10;
    },
  });
  let hashingService: DeepMocked<HashingService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: AppConfigService,
          useValue: appConfigService,
        },
      ],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get(UsersRepository);
    hashingService = module.get(HashingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a new user when the input is valid', async () => {
      // Arrange
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        password: 'Str0ngP@ssw0rd!12345',
        email: 'testuser@example.com',
      };

      const createdUser: UserModel = {
        userId: 1,
        username: 'testuser',
        password: 'hashed-password',
        email: 'testuser@example.com',
      };

      usersRepository.createUser.mockResolvedValue(createdUser);
      hashingService.hash.mockResolvedValue('hashed-password');

      // Act
      const result = await service.create(createUserDto);

      // Assert
      expect(result).toEqual(createdUser);
    });

    it('should throw a validation error when the password is weak', async () => {
      // Arrange
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        password: '1234567890',
        email: 'testuser@example.com',
      };

      const createdUser: UserModel = {
        userId: 1,
        username: 'testuser',
        password: 'hashed-password',
        email: 'testuser@example.com',
      };

      hashingService.hash.mockResolvedValue('hashed-password');
      usersRepository.createUser.mockResolvedValue(createdUser);

      // Act & Assert
      await expect(service.create(createUserDto)).rejects.toThrow(
        ValidationError,
      );
    });
  });
});
