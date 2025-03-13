import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { HabitsService } from './habits.service';
import { HabitDto } from './dto/habit.dto';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Get()
  findAll(
    @Query('limit') limit: string,
    @Query('sortBy') sortBy: string,
  ): HabitDto[] | Promise<HabitDto[]> {
    const limitNumber = limit ? +limit : undefined;
    return this.habitsService.findAll({ limit: limitNumber, sortBy });
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ): HabitDto | undefined | Promise<HabitDto | undefined> {
    const habit = this.habitsService.findOne(+id);

    if (!habit) {
      throw new NotFoundException(`Habits with id ${id} not found`);
    }
    return habit;
  }

  @Post()
  create(@Body() createHabitInput): HabitDto | Promise<HabitDto> {
    return this.habitsService.create(createHabitInput);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() input,
  ): HabitDto | undefined | Promise<HabitDto | undefined> {
    const habit = this.habitsService.update(+id, input);

    if (!habit) {
      throw new NotFoundException(`Habits with id ${id} not found`);
    }

    return habit;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string): void | Promise<void> {
    const habit = this.habitsService.remove(+id);

    if (!habit) {
      throw new NotFoundException(`Habit with id ${id} not found`);
    }
  }
}
