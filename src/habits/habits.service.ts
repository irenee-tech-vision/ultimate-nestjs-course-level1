import { Injectable } from '@nestjs/common';
import { InMemoryHabitsRepository } from './repositories/in-memory-habits.repository';
import { HabitDto } from './dto/habit.dto';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';

@Injectable()
export class HabitsService {
  constructor(private readonly habitsRepository: InMemoryHabitsRepository) {}

  findAll(query: {
    limit?: number;
    sortBy?: 'name' | 'id';
  }): HabitDto[] | Promise<HabitDto[]> {
    const limit = query.limit ?? 1;
    const sortBy = query.sortBy ?? 'name';

    return this.habitsRepository.findAllHabits({ limit, sortBy });
  }

  findOne(id: number): HabitDto | undefined | Promise<HabitDto | undefined> {
    return this.habitsRepository.findHabitById(id);
  }

  create(createHabitInput: CreateHabitDto): HabitDto | Promise<HabitDto> {
    return this.habitsRepository.createHabit(createHabitInput);
  }

  remove(id: number): HabitDto | undefined | Promise<HabitDto | undefined> {
    return this.habitsRepository.removeHabit(id);
  }

  update(
    id: number,
    updateInput: UpdateHabitDto,
  ): HabitDto | undefined | Promise<HabitDto | undefined> {
    return this.habitsRepository.updateHabit(id, updateInput);
  }
}
