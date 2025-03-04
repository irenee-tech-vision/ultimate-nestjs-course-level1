import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from '../../in-memory-db/in-memory-db.service';

@Injectable()
export class InMemoryHabitsRepository {
  constructor(private readonly db: InMemoryDbService) {}

  findAllHabits() {
    return this.db.findAll('habits');
  }

  createHabit(createHabitInput) {
    const newHabit = {
      ...createHabitInput,
      id: new Date().getTime(),
    };

    return this.db.create('habits', newHabit);
  }
}
