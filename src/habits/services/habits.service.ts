import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../../app-config/app-config.service';
import { HabitsRepository } from './habits.repository';
import { CreateHabitInput } from './models/create-habit.input';
import { HabitModel } from './models/habit.model';
import { UpdateHabitInput } from './models/update-habit.input';

@Injectable()
export class HabitsService {
  constructor(
    private readonly habitsRepository: HabitsRepository,
    private readonly appConfigService: AppConfigService,
  ) {}

  findAll(query: {
    limit?: number;
    sortBy?: 'name' | 'id';
  }): HabitModel[] | Promise<HabitModel[]> {
    const limit = query.limit ?? this.appConfigService.defaultLimit;
    const sortBy = query.sortBy ?? 'name';

    return this.habitsRepository.findAllHabits({ limit, sortBy });
  }

  findOne(
    id: number,
  ): HabitModel | undefined | Promise<HabitModel | undefined> {
    return this.habitsRepository.findHabitById(id);
  }

  create(createHabitInput: CreateHabitInput): HabitModel | Promise<HabitModel> {
    return this.habitsRepository.createHabit(createHabitInput);
  }

  remove(id: number): HabitModel | undefined | Promise<HabitModel | undefined> {
    return this.habitsRepository.removeHabit(id);
  }

  update(
    updateInput: UpdateHabitInput,
  ): HabitModel | undefined | Promise<HabitModel | undefined> {
    return this.habitsRepository.updateHabit(updateInput);
  }
}
