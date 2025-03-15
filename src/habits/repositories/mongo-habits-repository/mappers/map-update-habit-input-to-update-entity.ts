import { UpdateHabitInput } from '../../../services/models/update-habit.input';
import { HabitEntity } from '../entities/habit.entity';

export const mapUpdateHabitModelToUpdateEntity = (
  updateHabitInput: UpdateHabitInput,
): Partial<HabitEntity> => {
  return {
    ...updateHabitInput,
    updatedAt: new Date(),
  };
};
