import { Module } from '@nestjs/common';
import { HabitsController } from './habits.controller';

@Module({
  controllers: [HabitsController]
})
export class HabitsModule {}
