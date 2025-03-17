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
  Query
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { mapCreateUserDtoToCreateUserInput } from './mappers/map-create-user-dto-to-user-input';
import { mapUpdateUserDtoToUpdateUserInput } from './mappers/map-update-user-dto-to-update-user-input';
import { mapUserModelToUserDto } from './mappers/map-user-model-to-user-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(
    @Query('limit') limit: string,
    @Query('sortBy') sortBy: 'username' | 'userId' | 'email',
  ): Promise<UserDto[]> {
    const limitNumber = limit ? +limit : undefined;
    const users = await this.usersService.findAll({
      limit: limitNumber,
      sortBy,
    });

    return users.map((user) => mapUserModelToUserDto(user)!);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDto | undefined> {
    const user = await this.usersService.findOne(+id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return mapUserModelToUserDto(user);
  }

  @Post()
  async create(@Body() createUserInput: CreateUserDto): Promise<UserDto> {
    const user = await this.usersService.create(
      mapCreateUserDtoToCreateUserInput(createUserInput),
    );
    return mapUserModelToUserDto(user)!;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() input: UpdateUserDto,
  ): Promise<UserDto | undefined> {
    const user = await this.usersService.update(
      mapUpdateUserDtoToUpdateUserInput(+id, input),
    );

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return mapUserModelToUserDto(user);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const user = await this.usersService.remove(+id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
