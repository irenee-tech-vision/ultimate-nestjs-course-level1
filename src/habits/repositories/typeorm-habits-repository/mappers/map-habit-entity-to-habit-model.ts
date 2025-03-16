import { HabitModel } from '../../../services/models/habit.model';
import { HabitEntity } from '../entities/habit.entity';

export const mapHabitEntityToHabitModel = (
  entity?: HabitEntity | null,
): HabitModel | undefined => {
  if (!entity) {
    return undefined;
  }

  return {
    habitId: entity.id,
    name: entity.name,
    description: entity.description,
  };
};
