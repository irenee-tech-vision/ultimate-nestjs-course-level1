import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { HabitsService } from './habits.service';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Get()
  findAll() {
    return this.habitsService.findAll();
  }

  @Post()
  create(@Body() createHabitInput) {
    return this.habitsService.create(createHabitInput)
  }
}
