import { CreateEntityInput } from '../../../in-memory-db/models/create-entity-input.type';
import { CreateHabitDto } from '../../controllers/dto/create-habit.dto';
import { CreateHabitInput } from '../../services/models/create-habit.input';
import { HabitEntity } from '../entities/habit.entity';

export const mapCreateHabitInputToCreateEntityInput = (
  createHabitInput: CreateHabitInput,
): CreateEntityInput<HabitEntity> => {
  const now = new Date();
  return {
    ...createHabitInput,
    habitId: now.getTime(),
    createdAt: now,
    updatedAt: now,
  };
};
