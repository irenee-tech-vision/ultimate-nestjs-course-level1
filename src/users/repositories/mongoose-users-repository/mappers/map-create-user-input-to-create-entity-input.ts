import { CreateUserInput } from '../../../services/models/create-user.input';
import { UserEntity } from '../entities/user.entity';

export const mapCreateUserInputToCreateEntityInput = (
  createUserInput: CreateUserInput,
): UserEntity => {
  const now = new Date();
  return {
    ...createUserInput,
    userId: now.getTime(),
  };
};
