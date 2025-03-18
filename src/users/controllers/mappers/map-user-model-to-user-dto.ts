import { UserModel } from '../../services/models/user.model';
import { UserDto } from '../dto/user.dto';

export const mapUserModelToUserDto = (
  user?: UserModel,
): UserDto | undefined => {
  if (!user) {
    return undefined;
  }

  return {
    id: user.userId,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    dateOfBirth: user.dateOfBirth,
  };
};
