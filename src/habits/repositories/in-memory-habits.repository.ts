import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryHabitsRepository {
  private habits: any[] = [];

  findAllHabits() {
    return this.habits;
  }

  createHabit(createHabitInput) {
    const newHabit = {
      ...createHabitInput,
      id: new Date().getTime()
    }

    this.habits.push(newHabit);

    return newHabit;
  }

}
