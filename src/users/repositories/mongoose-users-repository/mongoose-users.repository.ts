import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
export class MongooseUsersRepository implements UsersRepository {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserEntity>,
  ) {}

  async findAllUsers(query: FindAllUsersQuery): Promise<UserModel[]> {
    const usersEntities = await this.userModel
      .find()
      .limit(query.limit ?? 1000)
      .sort(query.sortBy);

    return usersEntities.map(
      (userEntity) => mapUserEntityToUserModel(userEntity)!,
    );
  }

  async findUserById(userId: number): Promise<UserModel | undefined> {
    const userEntity = await this.userModel.findOne({ userId });
    return mapUserEntityToUserModel(userEntity);
  }

  async createUser(createUserInput: CreateUserInput): Promise<UserModel> {
    const userEntity = await this.userModel.create(
      mapCreateUserInputToCreateEntityInput(createUserInput),
    );
    return mapUserEntityToUserModel(userEntity)!;
  }

  async updateUser(
    updateUserInput: UpdateUserInput,
  ): Promise<UserModel | undefined> {
    const userEntity = await this.userModel.findOneAndUpdate(
      { userId: updateUserInput.userId },
      mapUpdateHabitModelToUpdateEntityInput(updateUserInput),
      {
        returnDocument: 'after',
      },
    );

    return mapUserEntityToUserModel(userEntity);
  }

  async removeUser(userId: number): Promise<UserModel | undefined> {
    const userEntity = await this.userModel.findOneAndDelete({ userId });
    return mapUserEntityToUserModel(userEntity);
  }
}
