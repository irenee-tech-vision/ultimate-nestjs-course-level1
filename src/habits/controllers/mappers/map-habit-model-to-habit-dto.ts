import { HabitModel } from '../../services/models/habit.model';
import { HabitDto } from '../dto/habit.dto';

export const mapHabitModelToHabitDto = (
  habit: HabitModel,
): HabitDto | undefined => {
  if (!habit) {
    return undefined;
  }

  return {
    id: habit.habitId,
    name: habit.name,
    description: habit.description,
  };
};
