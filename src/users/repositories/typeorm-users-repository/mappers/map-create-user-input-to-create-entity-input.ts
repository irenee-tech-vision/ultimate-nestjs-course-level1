import { CreateEntityInput } from '../../../../in-memory-db/models/create-entity-input.type';
import { CreateUserInput } from '../../../services/models/create-user.input';
import { UserEntity } from '../entities/user.entity';

export const mapCreateUserInputToCreateEntityInput = (
  createUserInput: CreateUserInput,
): CreateEntityInput<UserEntity> => {
  const userEntity = new UserEntity();

  userEntity.username = createUserInput.username;
  userEntity.email = createUserInput.email;
  userEntity.password = createUserInput.password;
  userEntity.firstName = createUserInput.firstName;
  userEntity.lastName = createUserInput.lastName;

  return userEntity;
};
