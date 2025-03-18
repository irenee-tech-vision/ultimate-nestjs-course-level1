import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto, createUserSchema } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { mapCreateUserDtoToCreateUserInput } from './mappers/map-create-user-dto-to-user-input';
import { mapUpdateUserDtoToUpdateUserInput } from './mappers/map-update-user-dto-to-update-user-input';
import { mapUserModelToUserDto } from './mappers/map-user-model-to-user-dto';
import {
  isMinLength,
  isNotEmptyString,
  isRequired,
  isString,
} from '../../lib/http-input-validation';
import { ValidateDtoInputPipe } from '../../common/pipes/validate-dto-input/validate-dto-input.pipe';
import { ValidateZodSchemaPipe } from '../../common/pipes/validate-zod-schema/validate-zod-schema.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(
    @Query('limit', ParseIntPipe, new DefaultValuePipe(1000)) limit: number,
    @Query('sortBy') sortBy: 'username' | 'userId' | 'email',
  ): Promise<UserDto[]> {
    const users = await this.usersService.findAll({
      limit,
      sortBy,
    });

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
    @Body(new ValidateZodSchemaPipe(createUserSchema))
    createUserInput: CreateUserDto,
  ): Promise<UserDto> {
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
    this.validateUpdateUserDto(input);
    const user = await this.usersService.update(
      mapUpdateUserDtoToUpdateUserInput(id, input),
    );

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return mapUserModelToUserDto(user);
  }

  private validateUpdateUserDto(updateUserInput: UpdateUserDto) {
    isString(updateUserInput.username, 'username');
    isNotEmptyString(updateUserInput.username?.trim(), 'username');

    isString(updateUserInput.email, 'email');
    isNotEmptyString(updateUserInput.email?.trim(), 'email');

    isString(updateUserInput.password, 'password');
    isNotEmptyString(updateUserInput.password, 'password');
    isMinLength(updateUserInput.password!, 'password', 8);

    isString(updateUserInput.firstName, 'firstName');

    isString(updateUserInput.lastName, 'lastName');
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
