import { DtoInput } from '../../../common/dto/dto-input';
import {
  isRequired,
  isNotEmptyString,
  isMinLength,
  isString,
  isDate,
} from '../../../lib/http-input-validation';

export class CreateUserDto extends DtoInput {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;

  validate(createUserInput: CreateUserDto): void {
    isRequired(createUserInput.username, 'username');
    isString(createUserInput.username, 'username');
    isNotEmptyString(createUserInput.username, 'username');

    isRequired(createUserInput.email, 'email');
    isString(createUserInput.email, 'email');
    isNotEmptyString(createUserInput.username, 'email');

    isRequired(createUserInput.password, 'password');
    isString(createUserInput.password, 'password');
    isNotEmptyString(createUserInput.password, 'password');
    isMinLength(createUserInput.password, 'password', 8);

    isString(createUserInput.firstName, 'firstName');

    isString(createUserInput.lastName, 'lastName');

    isDate(createUserInput.dateOfBirth, 'dateOfBirth');
  }

  toInstance(value: CreateUserDto): CreateUserDto {
    const dto = new CreateUserDto();

    dto.username = value.username;
    dto.email = value.email;
    dto.password = value.password;
    dto.firstName = value.firstName;
    dto.lastName = value.lastName;
    dto.dateOfBirth = value.dateOfBirth
      ? new Date(value.dateOfBirth)
      : undefined;

    return dto;
  }
}
