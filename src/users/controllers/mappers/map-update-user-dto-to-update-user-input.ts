import { UpdateUserInput } from '../../services/models/update-user.input';
import { UpdateUserDto } from '../dto/update-user.dto';

export const mapUpdateUserDtoToUpdateUserInput = (
  id: number,
  updateUserDto: UpdateUserDto,
): UpdateUserInput => {
  return {
    username: updateUserDto.username,
    email: updateUserDto.email,
    password: updateUserDto.password,
    firstName: updateUserDto.firstName,
    lastName: updateUserDto.lastName,
    userId: id,
  };
};
