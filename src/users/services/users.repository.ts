import { SyncOrAsync } from '../../common/types/sync-or-async.type';
import { Undefinable } from '../../common/types/undefinable.type';
import { CreateUserInput } from './models/create-user.input';
import { FindAllUsersQuery } from './models/find-all-users-query.type';
import { UpdateUserInput } from './models/update-user.input';
import { UserModel } from './models/user.model';

export abstract class UsersRepository {
  abstract findAllUsers(query: FindAllUsersQuery): SyncOrAsync<UserModel[]>;

  abstract findUserById(userId: number): SyncOrAsync<Undefinable<UserModel>>;

  abstract findUserByUsername(username: string): SyncOrAsync<Undefinable<UserModel>>;

  abstract createUser(createUserInput: CreateUserInput): SyncOrAsync<UserModel>;

  abstract updateUser(
    updateUserInput: UpdateUserInput,
  ): SyncOrAsync<Undefinable<UserModel>>;

  abstract removeUser(userId: number): SyncOrAsync<Undefinable<UserModel>>;
}
