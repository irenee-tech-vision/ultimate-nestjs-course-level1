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
import { HabitsService } from '../services/habits.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { HabitDto } from './dto/habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { mapCreateHabitDtoToCreateHabitInput } from './mappers/map-create-habit-dto-create-to-habit-input';
import { mapHabitModelToHabitDto } from './mappers/map-habit-model-to-habit-dto';
import { mapUpdateHabitDtoToUpdateHabitInput } from './mappers/map-update-habit-dto-to-update-habit-input';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Get()
  async findAll(
    @Query('limit') limit: string,
    @Query('sortBy') sortBy: 'name' | 'id',
  ): Promise<HabitDto[]> {
    const limitNumber = limit ? +limit : undefined;
    const habits = await this.habitsService.findAll({
      limit: limitNumber,
      sortBy,
    });

    return habits.map((habit) => mapHabitModelToHabitDto(habit)!);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<HabitDto | undefined> {
    const habit = await this.habitsService.findOne(+id);

    if (!habit) {
      throw new NotFoundException(`Habits with id ${id} not found`);
    }
    return mapHabitModelToHabitDto(habit);
  }

  @Post()
  async create(@Body() createHabitInput: CreateHabitDto): Promise<HabitDto> {
    const habit = await this.habitsService.create(
      mapCreateHabitDtoToCreateHabitInput(createHabitInput),
    );
    return mapHabitModelToHabitDto(habit)!;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() input: UpdateHabitDto,
  ): Promise<HabitDto | undefined> {
    const habit = await this.habitsService.update(
      mapUpdateHabitDtoToUpdateHabitInput(+id, input),
    );

    if (!habit) {
      throw new NotFoundException(`Habits with id ${id} not found`);
    }

    return mapHabitModelToHabitDto(habit);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const habit = await this.habitsService.remove(+id);

    if (!habit) {
      throw new NotFoundException(`Habit with id ${id} not found`);
    }
  }
}
