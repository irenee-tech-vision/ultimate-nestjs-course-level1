import { BadRequestException } from '@nestjs/common';

export const isMinLength = (
  value: string,
  fieldName: string,
  minLength: number,
) => {
  if (value === null || value === undefined) {
    return;
  }

  if (value.length < minLength) {
    throw new BadRequestException(
      `${fieldName} must be at least ${minLength} characters`,
    );
  }
};
