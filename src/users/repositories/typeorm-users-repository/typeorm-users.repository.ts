import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from '../../services/models/create-user.input';
import { FindAllUsersQuery } from '../../services/models/find-all-users-query.type';
import { UpdateUserInput } from '../../services/models/update-user.input';
import { UserModel } from '../../services/models/user.model';
import { UsersRepository } from '../../services/users.repository';
import { UserEntity } from './entities/user.entity';
import { mapCreateUserInputToCreateEntityInput } from './mappers/map-create-user-input-to-create-entity-input';
import { mapUpdateHabitModelToUpdateEntityInput } from './mappers/map-update-user-input-to-update-entity-input';
import { mapUserEntityToUserModel } from './mappers/map-user-entity-to-user-model';

@Injectable()
export class TypeormUsersRepository implements UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async findAllUsers(query: FindAllUsersQuery): Promise<UserModel[]> {
    const usersEntities = await this.repository.find({
      take: query.limit,
      order: query.sortBy ? { [query.sortBy]: 'ASC' } : undefined,
    });

    return usersEntities.map(
      (userEntity) => mapUserEntityToUserModel(userEntity)!,
    );
  }

  async findUserById(userId: number): Promise<UserModel | undefined> {
    const userEntity = await this.repository.findOne({
      where: { userId },
    });
    return mapUserEntityToUserModel(userEntity);
  }

  async createUser(createUserInput: CreateUserInput): Promise<UserModel> {
    const userEntity = await this.repository.save(
      mapCreateUserInputToCreateEntityInput(createUserInput),
    );

    return mapUserEntityToUserModel(userEntity)!;
  }

  async updateUser(
    updateUserInput: UpdateUserInput,
  ): Promise<UserModel | undefined> {
    const userEntity = await this.repository.findOne({
      where: { userId: updateUserInput.userId },
    });

    if (!userEntity) {
      return undefined;
    }

    const updateUserEntity = await this.repository.save({
      ...userEntity,
      ...mapUpdateHabitModelToUpdateEntityInput(updateUserInput),
    });

    return mapUserEntityToUserModel(updateUserEntity);
  }

  async removeUser(userId: number): Promise<UserModel | undefined> {
    const userEntity = await this.repository.findOne({
      where: { userId },
    });

    if (!userEntity) {
      return undefined;
    }

    const result = await this.repository.delete(userEntity);
    if (result.affected === 0) {
      return undefined;
    }

    return mapUserEntityToUserModel(userEntity);
  }
}
