import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post
} from '@nestjs/common';
import { HabitsService } from './habits.service';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Get()
  findAll() {
    return this.habitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const habit = this.habitsService.findOne(+id);

    if (!habit) {
      throw new NotFoundException(`Habits with id ${id} not found`);
    }
    return habit;
  }

  @Post()
  create(@Body() createHabitInput) {
    return this.habitsService.create(createHabitInput);
  }
}
