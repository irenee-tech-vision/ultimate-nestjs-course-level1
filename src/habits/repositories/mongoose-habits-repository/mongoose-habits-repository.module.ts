import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HabitEntity, HabitEntitySchema } from './entities/habit.entity';
import { HabitsRepository } from '../../services/habits.repository';
import { MongooseHabitsRepository } from './mongoose-habits.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: HabitEntity.name,
        schema: HabitEntitySchema,
      },
    ]),
  ],
  providers: [
    {
      provide: HabitsRepository,
      useClass: MongooseHabitsRepository,
    },
  ],
  exports: [HabitsRepository],
})
export class MongooseHabitsRepositoryModule {}
