import { Injectable } from '@nestjs/common';
import { InMemoryDbRepository } from '../../../in-memory-db/in-memory-db.repository';
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
export class InMemoryUsersRepository implements UsersRepository {
  constructor(private readonly db: InMemoryDbRepository<UserEntity>) {}

  findAllUsers(query: FindAllUsersQuery): UserModel[] {
    const usersEntities = this.db.findAll(query);

    return usersEntities.map(
      (userEntity) => mapUserEntityToUserModel(userEntity)!,
    );
  }

  findUserById(userId: number): UserModel | undefined {
    const userEntity = this.db.findOneBy({ userId });
    return mapUserEntityToUserModel(userEntity);
  }

  async findUserByUsername(username: string): Promise<UserModel | undefined> {
    throw new Error('Method not implemented.');
  }

  createUser(createUserInput: CreateUserInput): UserModel {
    const userEntity = this.db.create(
      mapCreateUserInputToCreateEntityInput(createUserInput),
    );
    return mapUserEntityToUserModel(userEntity)!;
  }
  updateUser(updateUserInput: UpdateUserInput): UserModel | undefined {
    const userEntity = this.db.updateOneBy(
      { userId: updateUserInput.userId },
      mapUpdateHabitModelToUpdateEntityInput(updateUserInput),
    );

    return mapUserEntityToUserModel(userEntity);
  }

  removeUser(userId: number): UserModel | undefined {
    const userEntity = this.db.deleteOneBy({ userId });
    return mapUserEntityToUserModel(userEntity);
  }
}
