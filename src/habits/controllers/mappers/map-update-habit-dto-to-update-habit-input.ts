import { UpdateHabitInput } from '../../services/models/update-habit.input';
import { UpdateHabitDto } from '../dto/update-habit.dto';

export const mapUpdateHabitDtoToUpdateHabitInput = (
  id: number,
  updateHabitDto: UpdateHabitDto,
): UpdateHabitInput => {
  return {
    ...updateHabitDto,
    habitId: id,
  };
};

