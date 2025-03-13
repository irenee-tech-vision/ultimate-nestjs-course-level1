import { HabitDto } from '../../dto/habit.dto';
import { HabitEntity } from '../entities/habit.entity';

export const mapHabitEntityToHabitDto = (
  entity?: HabitEntity,
): HabitDto | undefined => {
  if (!entity) {
    return undefined;
  }

  return {
    id: entity.habitId,
    name: entity.name,
    description: entity.description,
  };
};
