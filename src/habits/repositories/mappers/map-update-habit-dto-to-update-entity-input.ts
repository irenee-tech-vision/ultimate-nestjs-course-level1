import { UpdateEntityInput } from '../../../in-memory-db/models/update-entity-input.type';
import { UpdateHabitDto } from '../../dto/update-habit.dto';
import { HabitEntity } from '../entities/habit.entity';

export const mapUpdateHabitDtoToUpdateEntityInput = (
  updateHabitDto: UpdateHabitDto,
): UpdateEntityInput<HabitEntity> => {
  return {
    ...updateHabitDto,
    updatedAt: new Date(),
  };
};
