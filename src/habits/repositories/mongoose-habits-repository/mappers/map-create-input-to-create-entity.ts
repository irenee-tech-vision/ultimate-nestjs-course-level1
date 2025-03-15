import { CreateHabitInput } from '../../../services/models/create-habit.input';
import { HabitEntity } from '../entities/habit.entity';

export const mapCreateHabitInputToCreateEntity = (
  createHabitInput: CreateHabitInput,
): HabitEntity => {
  const now = new Date();
  return {
    ...createHabitInput,
    habitId: now.getTime(),
  };
};
