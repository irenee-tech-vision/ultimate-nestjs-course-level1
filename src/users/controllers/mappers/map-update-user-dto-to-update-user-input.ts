import { UpdateUserInput } from '../../services/models/update-user.input';
import { UpdateUserDto } from '../dto/update-user.dto';

const removeUndefinedValues = <T extends Record<string, any>>(
  obj: T,
): Partial<T> =>
  Object.entries(obj)
    .filter(([_, value]) => value !== undefined)
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

export const mapUpdateUserDtoToUpdateUserInput = (
  id: number,
  updateUserDto: UpdateUserDto,
): UpdateUserInput => {
  const cleanData = removeUndefinedValues<Partial<UpdateUserInput>>({
    username: updateUserDto.username,
    email: updateUserDto.email,
    password: updateUserDto.password,
    firstName: updateUserDto.firstName,
    lastName: updateUserDto.lastName,
    dateOfBirth: updateUserDto.dateOfBirth,
  });

  return {
    ...cleanData,
    userId: id,
  };
};
