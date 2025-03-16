import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HabitEntity } from './entities/habit.entity';
import { HabitsRepository } from '../../services/habits.repository';
import { TypeormHabitsRepository } from './typeorm-habits.repository';

@Module({
  imports: [TypeOrmModule.forFeature([HabitEntity])],
  providers: [
    {
      provide: HabitsRepository,
      useClass: TypeormHabitsRepository,
    },
  ],
  exports: [HabitsRepository],
})
export class TypeormHabitsRepositoryModule {}
