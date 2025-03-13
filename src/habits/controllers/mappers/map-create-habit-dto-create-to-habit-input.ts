import { CreateHabitInput } from '../../services/models/create-habit.input';
import { CreateHabitDto } from '../dto/create-habit.dto';

export const mapCreateHabitDtoToCreateHabitInput = (
  createHabitDto: CreateHabitDto,
): CreateHabitInput => {
  return {
    ...createHabitDto,
  };
};
