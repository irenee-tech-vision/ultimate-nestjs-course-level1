import { UserModel } from '../../../services/models/user.model';
import { UserEntity } from '../entities/user.entity';

export const mapUserEntityToUserModel = (
  entity?: UserEntity | null,
): UserModel | undefined => {
  if (!entity) {
    return undefined;
  }

  return {
    userId: entity.userId,
    username: entity.username,
    email: entity.email,
    password: entity.password,
    firstName: entity.firstName,
    lastName: entity.lastName,
  };
};
