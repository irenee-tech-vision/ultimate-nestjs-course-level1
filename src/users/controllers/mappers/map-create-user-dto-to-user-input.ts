import { CreateUserInput } from '../../services/models/create-user.input';
import { CreateUserDto } from '../dto/create-user.dto';

export const mapCreateUserDtoToCreateUserInput = (
  createUserDto: CreateUserDto,
): CreateUserInput => {
  return {
    ...createUserDto,
  };
};
