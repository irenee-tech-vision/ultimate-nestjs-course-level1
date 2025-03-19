import { plainToInstance } from 'class-transformer';
import { UserModel } from '../../services/models/user.model';
import { UserDto } from '../dto/user.dto';

export const mapUserModelToUserDto = (
  user?: UserModel,
): UserDto | undefined => {
  if (!user) {
    return undefined;
  }

  return plainToInstance(
    UserDto,
    {
      ...user,
      id: user.userId,
    },
    {
      excludeExtraneousValues: true,
    },
  );
};
