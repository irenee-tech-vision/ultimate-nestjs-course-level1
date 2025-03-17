import { UpdateEntityInput } from '../../../../in-memory-db/models/update-entity-input.type';
import { UpdateUserInput } from '../../../services/models/update-user.input';
import { UserEntity } from '../entities/user.entity';

export const mapUpdateHabitModelToUpdateEntityInput = (
  updateHabitInput: UpdateUserInput,
): UpdateEntityInput<UserEntity> => {
  return {
    ...updateHabitInput,
  };
};
