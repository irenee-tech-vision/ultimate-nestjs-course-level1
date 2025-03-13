import { CreateEntityInput } from '../../../in-memory-db/models/create-entity-input.type';
import { CreateHabitDto } from '../../dto/create-habit.dto';
import { HabitEntity } from '../entities/habit.entity';

export const mapCreateHabitDtoToCreateEntityInput = (
  createHabitDto: CreateHabitDto,
): CreateEntityInput<HabitEntity> => {
  const now = new Date();
  return {
    ...createHabitDto,
    habitId: now.getTime(),
    createdAt: now,
    updatedAt: now,
  };
};
