import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from '../../in-memory-db/in-memory-db.service';
import { CreateHabitDto } from '../dto/create-habit.dto';
import { HabitDto } from '../dto/habit.dto';
import { UpdateHabitDto } from '../dto/update-habit.dto';
import { HabitEntity } from './entities/habit.entity';
import { mapCreateHabitDtoToCreateEntityInput } from './mappers/map-create-dto-to-create-entity-input.mapper';
import { mapHabitEntityToHabitDto } from './mappers/map-habit-entity-to-habit-dto';
import { mapUpdateHabitDtoToUpdateEntityInput } from './mappers/map-update-habit-dto-to-update-entity-input';

@Injectable()
export class InMemoryHabitsRepository {
  constructor(private readonly db: InMemoryDbService) {}

  findAllHabits(query: { limit?: number; sortBy?: 'name' | 'id' }): HabitDto[] {
    const habitsEntities = this.db.findAll<HabitEntity>('habits', query);

    return habitsEntities.map(
      (habitEntity) => mapHabitEntityToHabitDto(habitEntity)!,
    );
  }

  findHabitById(id: number): HabitDto | undefined {
    const habitEntity = this.db.findOneBy<HabitEntity>('habits', {
      habitId: id,
    });
    return mapHabitEntityToHabitDto(habitEntity);
  }

  createHabit(createHabitInput: CreateHabitDto): HabitDto {
    const habitEntity = this.db.create<HabitEntity>(
      'habits',
      mapCreateHabitDtoToCreateEntityInput(createHabitInput),
    );
    return mapHabitEntityToHabitDto(habitEntity)!;
  }

  updateHabit(id: number, updateInput: UpdateHabitDto): HabitDto | undefined {
    const habitEntity = this.db.updateOneBy<HabitEntity>(
      'habits',
      { habitId: id },
      mapUpdateHabitDtoToUpdateEntityInput(updateInput),
    );

    return mapHabitEntityToHabitDto(habitEntity);
  }

  removeHabit(id: number): HabitDto | undefined {
    const habitEntity = this.db.deleteOneBy<HabitEntity>('habits', {
      habitId: id,
    });
    return mapHabitEntityToHabitDto(habitEntity);
  }
}
