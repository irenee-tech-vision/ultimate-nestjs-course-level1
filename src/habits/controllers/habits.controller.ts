import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiSecurity,
  ApiTags
} from '@nestjs/swagger';
import { SetAuthStrategy } from '../../auth/decorators/set-auth-strategy/set-auth-strategy.decorator';
import { AuthStrategyEnum } from '../../auth/models/auth-strategy.enum';
import { HabitsService } from '../services/habits.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { HabitDto } from './dto/habit.dto';
import { HabitsSortByFieldEnum } from './dto/habits-sort-by-field.enum';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { mapCreateHabitDtoToCreateHabitInput } from './mappers/map-create-habit-dto-create-to-habit-input';
import { mapHabitModelToHabitDto } from './mappers/map-habit-model-to-habit-dto';
import { mapUpdateHabitDtoToUpdateHabitInput } from './mappers/map-update-habit-dto-to-update-habit-input';

@ApiBearerAuth()
@ApiTags('habits')
@SetAuthStrategy(AuthStrategyEnum.USER_JWT)
@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @ApiResponse({
    status: 200,
    description: 'A list of habits',
    type: [HabitDto],
  })
  @ApiOperation({
    summary: 'Get all habits',
    description:
      'Retrieves a list of all habits with optional pagination and sorting.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit the number of habits returned',
    type: Number,
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'Sort habits by a specific field',
    enum: HabitsSortByFieldEnum,
    enumName: 'HabitsSortByField',
  })
  @Get()
  async findAll(
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Query(
      'sortBy',
      new ParseEnumPipe(HabitsSortByFieldEnum, { optional: true }),
    )
    sortBy?: HabitsSortByFieldEnum,
  ): Promise<HabitDto[]> {
    const limitNumber = limit ? +limit : undefined;
    const habits = await this.habitsService.findAll({
      limit: limitNumber,
      sortBy,
    });

    return habits.map((habit) => mapHabitModelToHabitDto(habit)!);
  }

  @ApiOkResponse({
    description: 'The habit matching the id',
    type: HabitDto,
  })
  @ApiNotFoundResponse({
    description: 'Habits is not found',
    example: {
      statusCode: 404,
      message: 'Habits with id 1 not found',
      error: 'Not Found',
    },
  })
  @ApiParam({
    name: 'id',
    description: 'The unique habit identifier',
  })
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
