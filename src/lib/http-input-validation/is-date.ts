import { BadRequestException } from '@nestjs/common';

  export const isDate = (value: any, fieldName: string) => {
    if (value === null || value === undefined) {
      return;
    }

    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new BadRequestException(`${fieldName} must be a valid date`);
    }
  };
