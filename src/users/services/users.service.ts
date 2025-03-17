import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../../app-config/app-config.service';
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

  create(createUserInput: CreateUserInput): UserModel | Promise<UserModel> {
    return this.usersRepository.createUser(createUserInput);
  }

  remove(
    userId: number,
  ): UserModel | undefined | Promise<UserModel | undefined> {
    return this.usersRepository.removeUser(userId);
  }

  update(
    updateInput: UpdateUserInput,
  ): UserModel | undefined | Promise<UserModel | undefined> {
    return this.usersRepository.updateUser(updateInput);
  }
}
