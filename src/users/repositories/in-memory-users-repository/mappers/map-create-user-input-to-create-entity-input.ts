import { CreateEntityInput } from '../../../../in-memory-db/models/create-entity-input.type';
import { CreateUserInput } from '../../../services/models/create-user.input';
import { UserEntity } from '../entities/user.entity';

export const mapCreateUserInputToCreateEntityInput = (
  createUserInput: CreateUserInput,
): CreateEntityInput<UserEntity> => {
  const now = new Date();
  return {
    ...createUserInput,
    userId: now.getTime(),
    createdAt: now,
    updatedAt: now,
  };
};
