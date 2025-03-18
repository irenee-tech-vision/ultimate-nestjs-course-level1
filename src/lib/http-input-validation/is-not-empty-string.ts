import { BadRequestException } from '@nestjs/common';

export const isNotEmptyString = (value: any, fieldName: string) => {
  if (value === null || value === undefined) {
    return;
  }

  if (value === '') {
    throw new BadRequestException(`${fieldName} must not be empty`);
  }
};
