import { UpdateEntityInput } from '../../../../in-memory-db/models/update-entity-input.type';
import { UpdateHabitInput } from '../../../services/models/update-habit.input';
import { HabitEntity } from '../entities/habit.entity';

export const mapUpdateHabitModelToUpdateEntityInput = (
  updateHabitInput: UpdateHabitInput,
): UpdateEntityInput<HabitEntity> => {
  return {
    ...updateHabitInput,
    updatedAt: new Date(),
  };
};
