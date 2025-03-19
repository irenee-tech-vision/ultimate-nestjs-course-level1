import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindAllUsersQueryDto } from './dto/find-all-users-query.dto';
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
    @Query()
    query: FindAllUsersQueryDto,
  ): Promise<UserDto[]> {
    const users = await this.usersService.findAll(query);

    return users.map((user) => mapUserModelToUserDto(user)!);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserDto | undefined> {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return mapUserModelToUserDto(user);
  }

  @Post()
  async create(
    @Body()
    createUserInput: CreateUserDto,
  ): Promise<UserDto> {
    console.log(createUserInput);
    const user = await this.usersService.create(
      mapCreateUserDtoToCreateUserInput(createUserInput),
    );
    return mapUserModelToUserDto(user)!;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: UpdateUserDto,
  ): Promise<UserDto | undefined> {
    const user = await this.usersService.update(
      mapUpdateUserDtoToUpdateUserInput(id, input),
    );

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return mapUserModelToUserDto(user);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const user = await this.usersService.remove(+id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
