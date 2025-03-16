import { CreateHabitInput } from '../../../services/models/create-habit.input';
import { HabitEntity } from '../entities/habit.entity';

export const mapCreateHabitInputToCreateEntity = (
  createHabitInput: CreateHabitInput,
): HabitEntity => {
  const habitEntity = new HabitEntity();

  habitEntity.name = createHabitInput.name;
  habitEntity.description = createHabitInput.description;

  return habitEntity;
};
