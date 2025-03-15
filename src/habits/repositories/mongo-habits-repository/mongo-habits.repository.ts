import { Injectable } from '@nestjs/common';
import { HabitsRepository } from '../../services/habits.repository';
import { MongoRepository } from '../../../mongo-connection/mongo.repository';
import { HabitEntity } from './entities/habit.entity';
import { FindAllHabitsQuery } from '../../services/models/find-all-habits.type';
import { FindAllQuery } from '../../../mongo-connection/models/find-all-query.type';
import { mapHabitEntityToHabitModel } from './mappers/map-habit-entity-to-habit-model';
import { HabitModel } from '../../services/models/habit.model';
import { CreateHabitInput } from '../../services/models/create-habit.input';
import { mapCreateHabitInputToCreateEntity } from './mappers/map-create-input-to-create-entity.mapper';
import { UpdateHabitInput } from '../../services/models/update-habit.input';
import { mapUpdateHabitModelToUpdateEntity } from './mappers/map-update-habit-input-to-update-entity';

@Injectable()
export class MongoHabitsRepository implements HabitsRepository {
  constructor(private readonly repository: MongoRepository<HabitEntity>) {}

  async findAllHabits(query: FindAllHabitsQuery): Promise<HabitModel[]> {
    let sortBy: FindAllQuery<HabitEntity>['sortBy'] =
      query.sortBy === 'id' ? 'habitId' : query.sortBy;

    const habitEntities = await this.repository.findAll({
      limit: query.limit,
      sortBy,
    });

    return habitEntities.map(
      (habitEntity) => mapHabitEntityToHabitModel(habitEntity)!,
    );
  }

  async findHabitById(habitId: number): Promise<HabitModel | undefined> {
    const habitEntity = await this.repository.findOneBy({ habitId });
    return mapHabitEntityToHabitModel(habitEntity);
  }

  async createHabit(createHabitInput: CreateHabitInput): Promise<HabitModel> {
    const habitEntity = await this.repository.create(
      mapCreateHabitInputToCreateEntity(createHabitInput),
    );

    return mapHabitEntityToHabitModel(habitEntity)!;
  }

  async updateHabit(
    updateHabitInput: UpdateHabitInput,
  ): Promise<HabitModel | undefined> {
    const habitEntity = await this.repository.updateOneBy(
      { habitId: updateHabitInput.habitId },
      mapUpdateHabitModelToUpdateEntity(updateHabitInput),
    );

    return mapHabitEntityToHabitModel(habitEntity);
  }

  async removeHabit(habitId: number): Promise<HabitModel | undefined> {
    const habitEntity = await this.repository.deleteOneBy({ habitId });
    return mapHabitEntityToHabitModel(habitEntity);
  }
}
