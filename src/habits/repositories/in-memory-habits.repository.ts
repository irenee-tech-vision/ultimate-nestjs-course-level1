import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from '../../in-memory-db/in-memory-db.service';
import { HabitDto } from '../dto/habit.dto';
import { HabitEntity } from './entities/habit.entity';
import { mapHabitEntityToHabitDto } from './mappers/map-habit-entity-to-habit-dto';

@Injectable()
export class InMemoryHabitsRepository {
  constructor(private readonly db: InMemoryDbService) {}

  findAllHabits(query: { limit?: number; sortBy?: string }): HabitDto[] {
    const habitsEntities = this.db.findAll<HabitEntity>('habits', query);

    return habitsEntities.map(
      (habitEntity) => mapHabitEntityToHabitDto(habitEntity)!,
    );
  }

  findHabitById(id: number): HabitDto | undefined {
    const habitEntity = this.db.findOneBy<HabitEntity>('habits', { id });
    return mapHabitEntityToHabitDto(habitEntity);
  }

  createHabit(createHabitInput): HabitDto {
    const now = new Date();

    const newHabit: HabitEntity = {
      ...createHabitInput,
      habitId: now.getTime(),
      updatedAt: now,
      createdAt: now,
    };

    const habitEntity = this.db.create<HabitEntity>('habits', newHabit);
    return mapHabitEntityToHabitDto(habitEntity)!;
  }

  updateHabit(id: number, updateInput): HabitDto | undefined {
    const habitEntity = this.db.updateOneBy<HabitEntity>(
      'habits',
      { id },
      { ...updateInput, updatedAt: new Date() },
    );

    return mapHabitEntityToHabitDto(habitEntity);
  }

  removeHabit(id: number): HabitDto | undefined {
    const habitEntity = this.db.deleteOneBy<HabitEntity>('habits', { id });
    return mapHabitEntityToHabitDto(habitEntity);
  }
}
