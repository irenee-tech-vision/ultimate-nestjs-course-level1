import { BadRequestException } from '@nestjs/common';

export const isString = (value: any, fieldName: string) => {
  if (value === null || value === undefined) {
    return;
  }

  if (typeof value !== 'string') {
    throw new BadRequestException(`${fieldName} must be a string`);
  }
};
