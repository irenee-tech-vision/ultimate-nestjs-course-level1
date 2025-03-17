import { UserModel } from '../../../services/models/user.model';
import { UserEntity } from '../entities/user.entity';

export const mapUserEntityToUserModel = (
  entity?: UserEntity | null,
): UserModel | undefined => {
  if (!entity) {
    return undefined;
  }

  return {
    ...entity,
  };
};
