import { BadRequestException } from '@nestjs/common';

export const isRequired = (value: any, fieldName: string) => {
  if (value === null || value === undefined) {
    throw new BadRequestException(`${fieldName} is required`);
  }
};
