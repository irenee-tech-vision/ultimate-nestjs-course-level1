import { Injectable } from '@nestjs/common';
import { CreateHabitInput } from './models/create-habit.input';
import { HabitModel } from './models/habit.model';
import { UpdateHabitInput } from './models/update-habit.input';
import { InMemoryHabitsRepository } from '../repositories/in-memory-habits.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HabitsService {
  constructor(
    private readonly habitsRepository: InMemoryHabitsRepository,
    private readonly configService: ConfigService,
  ) {}

  findAll(query: {
    limit?: number;
    sortBy?: 'name' | 'id';
  }): HabitModel[] | Promise<HabitModel[]> {
    const defaultLimit = this.configService.get('DEFAULT_LIMIT');
    const limit = query.limit ?? parseInt(defaultLimit ?? '3');
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
