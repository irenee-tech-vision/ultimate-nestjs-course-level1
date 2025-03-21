import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../../app-config/app-config.service';
import { ValidationError } from '../../common/exceptions/validation-error';
import { HashingService } from '../../hashing/hashing.service';
import { getPasswordStrength } from '../../lib/password-strength/get-password-strength';
import { PasswordStrengthEnum } from '../../lib/password-strength/password-strength.enum';
import { CreateUserInput } from './models/create-user.input';
import { FindAllUsersQuery } from './models/find-all-users-query.type';
import { UpdateUserInput } from './models/update-user.input';
import { UserModel } from './models/user.model';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly appConfigService: AppConfigService,
    private readonly hashingService: HashingService,
  ) {}

  findAll(query: FindAllUsersQuery): UserModel[] | Promise<UserModel[]> {
    const limit = query.limit ?? this.appConfigService.defaultLimit;
    const sortBy = query.sortBy ?? 'userId';

    return this.usersRepository.findAllUsers({ limit, sortBy });
  }

  findOne(
    userId: number,
  ): UserModel | undefined | Promise<UserModel | undefined> {
    return this.usersRepository.findUserById(userId);
  }

  findUserByUsername(
    username: string,
  ): UserModel | undefined | Promise<UserModel | undefined> {
    return this.usersRepository.findUserByUsername(username);
  }

  async create(createUserInput: CreateUserInput): Promise<UserModel> {
    const passwordStrength = getPasswordStrength(createUserInput.password);

    if (passwordStrength === PasswordStrengthEnum.WEAK) {
      throw new ValidationError('Password too weak');
    }

    const hashedPassword = await this.hashingService.hash(
      createUserInput.password,
    );

    return this.usersRepository.createUser({
      ...createUserInput,
      password: hashedPassword,
    });
  }

  remove(
    userId: number,
  ): UserModel | undefined | Promise<UserModel | undefined> {
    return this.usersRepository.removeUser(userId);
  }

  async update(updateInput: UpdateUserInput): Promise<UserModel | undefined> {
    if (updateInput.password) {
      const passwordStrength = getPasswordStrength(updateInput.password);

      if (passwordStrength === PasswordStrengthEnum.WEAK) {
        throw new ValidationError('Password too weak');
      }

      const hashedPassword = await this.hashingService.hash(
        updateInput.password,
      );

      return this.usersRepository.updateUser({
        ...updateInput,
        password: hashedPassword,
      });
    }

    return this.usersRepository.updateUser(updateInput);
  }
}
