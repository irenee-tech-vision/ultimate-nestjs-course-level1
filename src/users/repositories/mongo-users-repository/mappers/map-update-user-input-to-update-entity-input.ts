import { UpdateUserInput } from '../../../services/models/update-user.input';
import { UserEntity } from '../entities/user.entity';

export const mapUpdateHabitModelToUpdateEntityInput = (
  updateHabitInput: UpdateUserInput,
): Partial<UserEntity> => {
  return {
    ...updateHabitInput,
    updatedAt: new Date(),
  };
};
