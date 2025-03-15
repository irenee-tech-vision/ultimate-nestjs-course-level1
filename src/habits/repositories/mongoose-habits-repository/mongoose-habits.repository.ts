import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
export class MongooseHabitsRepository implements HabitsRepository {
  constructor(
    @InjectModel(HabitEntity.name)
    private readonly habitModel: Model<HabitEntity>,
  ) {}

  async findAllHabits(query: FindAllHabitsQuery): Promise<HabitModel[]> {
    const habits = await this.habitModel
      .find()
      .limit(query.limit ?? 100)
      .sort(query.sortBy);

    return habits.map((habit) => mapHabitEntityToHabitModel(habit)!);
  }

  async findHabitById(habitId: number): Promise<HabitModel | undefined> {
    const habitEntity = await this.habitModel.findOne({ habitId });

    return mapHabitEntityToHabitModel(habitEntity);
  }

  async createHabit(createHabitInput: CreateHabitInput): Promise<HabitModel> {
    const habitEntity = await this.habitModel.create(
      mapCreateHabitInputToCreateEntity(createHabitInput),
    );

    return mapHabitEntityToHabitModel(habitEntity)!;
  }

  async updateHabit(
    updateHabitInput: UpdateHabitInput,
  ): Promise<HabitModel | undefined> {
    const habitEntity = await this.habitModel.findOneAndUpdate(
      { habitId: updateHabitInput.habitId },
      mapUpdateHabitModelToUpdateEntity(updateHabitInput),
      {
        returnDocument: 'after',
      },
    );

    return mapHabitEntityToHabitModel(habitEntity);
  }

  async removeHabit(habitId: number): Promise<HabitModel | undefined> {
    const habitEntity = await this.habitModel.findOneAndDelete({ habitId });

    return mapHabitEntityToHabitModel(habitEntity);
  }
}
