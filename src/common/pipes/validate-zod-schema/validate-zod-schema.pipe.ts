import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ValidateZodSchemaPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      const parsedValued = this.schema.parse(value);
      return parsedValued;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
