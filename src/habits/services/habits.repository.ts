import { SyncOrAsync } from '../../common/types/sync-or-async.type';
import { Undefinable } from '../../common/types/undefinable.type';
import { CreateHabitInput } from '../services/models/create-habit.input';
import { HabitModel } from '../services/models/habit.model';
import { UpdateHabitInput } from '../services/models/update-habit.input';
import { FindAllHabitsQuery } from './models/find-all-habits.type';

export abstract class HabitsRepository {
  abstract findAllHabits(query: FindAllHabitsQuery): SyncOrAsync<HabitModel[]>;

  abstract findHabitById(habitId: number): SyncOrAsync<Undefinable<HabitModel>>;

  abstract createHabit(
    createHabitInput: CreateHabitInput,
  ): SyncOrAsync<HabitModel>;

  abstract updateHabit(
    updateHabitInput: UpdateHabitInput,
  ): SyncOrAsync<Undefinable<HabitModel>>;

  abstract removeHabit(habitId: number): SyncOrAsync<Undefinable<HabitModel>>;
}
