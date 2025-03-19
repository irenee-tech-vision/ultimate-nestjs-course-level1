import { Injectable } from '@nestjs/common';
import { MongoServerError } from 'mongodb';
import { ValidationError } from '../../../common/exceptions/validation-error';
import { MongoRepository } from '../../../mongo-connection/mongo.repository';
import { CreateUserInput } from '../../services/models/create-user.input';
import { FindAllUsersQuery } from '../../services/models/find-all-users-query.type';
import { UpdateUserInput } from '../../services/models/update-user.input';
import { UserModel } from '../../services/models/user.model';
import { UsersRepository } from '../../services/users.repository';
import { UserEntity } from './entities/user.entity';
import { mapCreateUserInputToCreateEntityInput } from './mappers/map-create-user-input-to-create-entity-input';
import { mapUpdateHabitModelToUpdateEntityInput } from './mappers/map-update-user-input-to-update-entity-input';
import { mapUserEntityToUserModel } from './mappers/map-user-entity-to-user-model';

const MONGO_DUPLICATE_KEY_ERROR = 11000;

@Injectable()
export class MongoUsersRepository implements UsersRepository {
  constructor(private readonly repository: MongoRepository<UserEntity>) {}

  async findAllUsers(query: FindAllUsersQuery): Promise<UserModel[]> {
    const usersEntities = await this.repository.findAll(query);

    return usersEntities.map(
      (userEntity) => mapUserEntityToUserModel(userEntity)!,
    );
  }

  async findUserById(userId: number): Promise<UserModel | undefined> {
    const userEntity = await this.repository.findOneBy({ userId });
    return mapUserEntityToUserModel(userEntity);
  }

  async createUser(createUserInput: CreateUserInput): Promise<UserModel> {
    try {
      const userEntity = await this.repository.create(
        mapCreateUserInputToCreateEntityInput(createUserInput),
      );
      return mapUserEntityToUserModel(userEntity)!;
    } catch (error) {
      if (
        error instanceof MongoServerError &&
        error.code === MONGO_DUPLICATE_KEY_ERROR
      ) {
        const duplicateField = Object.keys(error.keyValue)[0];
        throw new ValidationError(`User with ${duplicateField} already exists`);
      }
      throw error;
    }
  }

  async updateUser(
    updateUserInput: UpdateUserInput,
  ): Promise<UserModel | undefined> {
    try {
      const userEntity = await this.repository.updateOneBy(
        { userId: updateUserInput.userId },
        mapUpdateHabitModelToUpdateEntityInput(updateUserInput),
      );

      return mapUserEntityToUserModel(userEntity);
    } catch (error) {
      if (
        error instanceof MongoServerError &&
        error.code === MONGO_DUPLICATE_KEY_ERROR
      ) {
        const duplicateField = Object.keys(error.keyValue)[0];
        throw new ValidationError(`User with ${duplicateField} already exists`);
      }
      throw error;
    }
  }

  async removeUser(userId: number): Promise<UserModel | undefined> {
    const userEntity = await this.repository.deleteOneBy({ userId });
    return mapUserEntityToUserModel(userEntity);
  }
}
