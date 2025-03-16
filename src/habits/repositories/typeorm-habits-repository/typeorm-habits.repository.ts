import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HabitsRepository } from '../../services/habits.repository';
import { CreateHabitInput } from '../../services/models/create-habit.input';
import { FindAllHabitsQuery } from '../../services/models/find-all-habits.type';
import { HabitModel } from '../../services/models/habit.model';
import { UpdateHabitInput } from '../../services/models/update-habit.input';
import { HabitEntity } from './entities/habit.entity';
import { mapCreateHabitInputToCreateEntity } from './mappers/map-create-input-to-create-entity';
import { mapHabitEntityToHabitModel } from './mappers/map-habit-entity-to-habit-model';
import { mapUpdateHabitModelToUpdateEntity } from './mappers/map-update-habit-input-to-update-entity';

@Injectable()
export class TypeormHabitsRepository implements HabitsRepository {
  constructor(
    @InjectRepository(HabitEntity)
    private readonly repository: Repository<HabitEntity>,
  ) {}

  async findAllHabits(query: FindAllHabitsQuery): Promise<HabitModel[]> {
    const habitEntities = await this.repository.find({
      take: query.limit,
      order: query.sortBy ? { [query.sortBy]: 'ASC' } : undefined,
    });

    return habitEntities.map(
      (habitEntity) => mapHabitEntityToHabitModel(habitEntity)!,
    );
  }

  async findHabitById(habitId: number): Promise<HabitModel | undefined> {
    const habitEntity = await this.repository.findOne({
      where: { id: habitId },
    });

    return mapHabitEntityToHabitModel(habitEntity);
  }

  async createHabit(createHabitInput: CreateHabitInput): Promise<HabitModel> {
    const habitEntity = await this.repository.save(
      mapCreateHabitInputToCreateEntity(createHabitInput),
    );

    return mapHabitEntityToHabitModel(habitEntity)!;
  }

  async updateHabit(
    updateHabitInput: UpdateHabitInput,
  ): Promise<HabitModel | undefined> {
    const habitEntity = await this.repository.findOne({
      where: { id: updateHabitInput.habitId },
    });

    if (!habitEntity) {
      return undefined;
    }

    const updatedHabitEntity = await this.repository.save({
      ...habitEntity,
      ...mapUpdateHabitModelToUpdateEntity(updateHabitInput),
    });

    return mapHabitEntityToHabitModel(updatedHabitEntity);
  }

  async removeHabit(habitId: number): Promise<HabitModel | undefined> {
    const habitEntity = await this.repository.findOne({
      where: { id: habitId },
    });
    if (!habitEntity) {
      return undefined;
    }

    const result = await this.repository.delete(habitId);
    if (result.affected === 0) {
      return undefined;
    }

    return mapHabitEntityToHabitModel(habitEntity);
  }
}
