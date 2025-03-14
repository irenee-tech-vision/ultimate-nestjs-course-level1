import { Injectable } from '@nestjs/common';
import { InMemoryDbRepository } from '../../in-memory-db/in-memory-db.repository';
import { CreateHabitInput } from '../services/models/create-habit.input';
import { HabitModel } from '../services/models/habit.model';
import { UpdateHabitInput } from '../services/models/update-habit.input';
import { HabitEntity } from './entities/habit.entity';
import { mapCreateHabitInputToCreateEntityInput } from './mappers/map-create-input-to-create-entity-input.mapper';
import { mapHabitEntityToHabitModel } from './mappers/map-habit-entity-to-habit-model';
import { mapUpdateHabitModelToUpdateEntityInput } from './mappers/map-update-habit-input-to-update-entity-input';

@Injectable()
export class InMemoryHabitsRepository {
  constructor(private readonly db: InMemoryDbRepository<HabitEntity>) {}

  findAllHabits(query: {
    limit?: number;
    sortBy?: 'name' | 'id';
  }): HabitModel[] {
    const habitsEntities = this.db.findAll(query);

    return habitsEntities.map(
      (habitEntity) => mapHabitEntityToHabitModel(habitEntity)!,
    );
  }

  findHabitById(id: number): HabitModel | undefined {
    const habitEntity = this.db.findOneBy({
      habitId: id,
    });
    return mapHabitEntityToHabitModel(habitEntity);
  }

  createHabit(createHabitInput: CreateHabitInput): HabitModel {
    const habitEntity = this.db.create(
      mapCreateHabitInputToCreateEntityInput(createHabitInput),
    );
    return mapHabitEntityToHabitModel(habitEntity)!;
  }

  updateHabit(updateInput: UpdateHabitInput): HabitModel | undefined {
    const habitEntity = this.db.updateOneBy(
      { habitId: updateInput.habitId },
      mapUpdateHabitModelToUpdateEntityInput(updateInput),
    );

    return mapHabitEntityToHabitModel(habitEntity);
  }

  removeHabit(id: number): HabitModel | undefined {
    const habitEntity = this.db.deleteOneBy({
      habitId: id,
    });
    return mapHabitEntityToHabitModel(habitEntity);
  }
}
