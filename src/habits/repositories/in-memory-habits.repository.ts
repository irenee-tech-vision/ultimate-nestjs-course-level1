import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from '../../in-memory-db/in-memory-db.service';
import { CreateHabitInput } from '../services/models/create-habit.input';
import { HabitModel } from '../services/models/habit.model';
import { UpdateHabitInput } from '../services/models/update-habit.input';
import { HabitEntity } from './entities/habit.entity';
import { mapCreateHabitInputToCreateEntityInput } from './mappers/map-create-input-to-create-entity-input.mapper';
import { mapHabitEntityToHabitModel } from './mappers/map-habit-entity-to-habit-model';
import { mapUpdateHabitModelToUpdateEntityInput } from './mappers/map-update-habit-input-to-update-entity-input';

@Injectable()
export class InMemoryHabitsRepository {
  constructor(private readonly db: InMemoryDbService) {}

  findAllHabits(query: { limit?: number; sortBy?: 'name' | 'id' }): HabitModel[] {
    const habitsEntities = this.db.findAll<HabitEntity>('habits', query);

    return habitsEntities.map(
      (habitEntity) => mapHabitEntityToHabitModel(habitEntity)!,
    );
  }

  findHabitById(id: number): HabitModel | undefined {
    const habitEntity = this.db.findOneBy<HabitEntity>('habits', {
      habitId: id,
    });
    return mapHabitEntityToHabitModel(habitEntity);
  }

  createHabit(createHabitInput: CreateHabitInput): HabitModel {
    const habitEntity = this.db.create<HabitEntity>(
      'habits',
      mapCreateHabitInputToCreateEntityInput(createHabitInput),
    );
    return mapHabitEntityToHabitModel(habitEntity)!;
  }

  updateHabit(updateInput: UpdateHabitInput): HabitModel | undefined {
    const habitEntity = this.db.updateOneBy<HabitEntity>(
      'habits',
      { habitId: updateInput.habitId },
      mapUpdateHabitModelToUpdateEntityInput(updateInput),
    );

    return mapHabitEntityToHabitModel(habitEntity);
  }

  removeHabit(id: number): HabitModel | undefined {
    const habitEntity = this.db.deleteOneBy<HabitEntity>('habits', {
      habitId: id,
    });
    return mapHabitEntityToHabitModel(habitEntity);
  }
}
