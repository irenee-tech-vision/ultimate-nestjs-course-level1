import { HabitModel } from '../../../services/models/habit.model';
import { HabitEntity } from '../entities/habit.entity';

export const mapHabitEntityToHabitModel = (
  entity?: HabitEntity,
): HabitModel | undefined => {
  if (!entity) {
    return undefined;
  }

  return {
    habitId: entity.habitId,
    name: entity.name,
    description: entity.description,
  };
};
