import { Injectable } from '@nestjs/common';
import { InMemoryHabitsRepository } from './repositories/in-memory-habits.repository';

@Injectable()
export class HabitsService {
  constructor(private readonly habitsRepository: InMemoryHabitsRepository) {}

  findAll(query: { limit?: number; sortBy?: string }) {
    const limit = query.limit ?? 1;
    const sortBy = query.sortBy ?? 'name';

    return this.habitsRepository.findAllHabits({ limit, sortBy });
  }

  findOne(id: number) {
    return this.habitsRepository.findHabitById(id);
  }

  create(createHabitInput) {
    return this.habitsRepository.createHabit(createHabitInput);
  }

  remove(id: number) {
    return this.habitsRepository.removeHabit(id);
  }

  update(id: number, updateInput) {
    return this.habitsRepository.updateHabit(id, updateInput);
  }
}
