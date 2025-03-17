import { UpdateUserInput } from '../../services/models/update-user.input';
import { UpdateUserDto } from '../dto/update-user.dto';

export const mapUpdateUserDtoToUpdateUserInput = (
  id: number,
  updateUserDto: UpdateUserDto,
): UpdateUserInput => {
  return {
    ...updateUserDto,
    userId: id,
  };
};
