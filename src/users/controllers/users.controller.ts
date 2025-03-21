import {
  Body,
  ClassSerializerInterceptor,
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
  Query,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { AdminUser } from '../../auth/decorators/admin-user/admin-user.decorator';
import { GrantAccess } from '../../auth/decorators/grant-access/grant-access.decorator';
import { AccessLevelEnum } from '../../auth/models/access-level.enum';
import { AdminUserModel } from '../../auth/models/admin-user.model';
import { RedactResponseInterceptor } from '../../common/interceptors/redact-response/redact-response.interceptor';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindAllUsersQueryDto } from './dto/find-all-users-query.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { mapCreateUserDtoToCreateUserInput } from './mappers/map-create-user-dto-to-user-input';
import { mapUpdateUserDtoToUpdateUserInput } from './mappers/map-update-user-dto-to-update-user-input';
import { mapUserModelToUserDto } from './mappers/map-user-model-to-user-dto';

@UseInterceptors(RedactResponseInterceptor, ClassSerializerInterceptor)
@SerializeOptions({
  type: UserDto,
  excludeExtraneousValues: true,
})
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrantAccess(AccessLevelEnum.SUPPORT_USER)
  @Get()
  async findAll(
    @Query()
    query: FindAllUsersQueryDto,
  ): Promise<UserDto[]> {
    const users = await this.usersService.findAll(query);

    return users.map((user) => mapUserModelToUserDto(user)!);
  }

  @GrantAccess(AccessLevelEnum.SUPPORT_USER)
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

  @GrantAccess(AccessLevelEnum.SYSTEM_USER)
  @Post()
  async create(
    @Body()
    createUserInput: CreateUserDto,
  ): Promise<UserDto> {
    const user = await this.usersService.create(
      mapCreateUserDtoToCreateUserInput(createUserInput),
    );
    return mapUserModelToUserDto(user)!;
  }

  @GrantAccess(AccessLevelEnum.SYSTEM_USER)
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
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @AdminUser() adminUser: AdminUserModel,
  ): Promise<void> {
    const user = await this.usersService.remove(+id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
