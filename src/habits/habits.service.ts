import { Injectable } from '@nestjs/common';
import { InMemoryHabitsRepository } from './repositories/in-memory-habits.repository';

@Injectable()
export class HabitsService {
  constructor(private readonly habitsRepository: InMemoryHabitsRepository) {}

  findAll() {
    return this.habitsRepository.findAllHabits();
  }

  findOne(id: number) {
    return this.habitsRepository.findHabitById(id);
  }

  create(createHabitInput) {
    return this.habitsRepository.createHabit(createHabitInput);
  }
}
