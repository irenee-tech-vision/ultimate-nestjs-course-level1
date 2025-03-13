import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from '../../in-memory-db/in-memory-db.service';

@Injectable()
export class InMemoryHabitsRepository {
  constructor(private readonly db: InMemoryDbService) {}

  findAllHabits(query: { limit?: number; sortBy?: string }) {
    return this.db.findAll('habits', query);
  }

  findHabitById(id: number) {
    return this.db.findOneBy('habits', { id });
  }

  createHabit(createHabitInput) {
    const newHabit = {
      ...createHabitInput,
      id: new Date().getTime(),
    };

    return this.db.create('habits', newHabit);
  }

  updateHabit(id: number, updateInput) {
    return this.db.updateOneBy('habits', { id }, updateInput);
  }

  removeHabit(id: number) {
    return this.db.deleteOneBy('habits', { id });
  }
}
