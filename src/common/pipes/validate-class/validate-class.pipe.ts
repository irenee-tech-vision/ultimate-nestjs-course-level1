import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidateClassPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (this.isNativeType(metadata.metatype)) {
      return value;
    }

    const dto = plainToInstance(metadata.metatype!, value);
    const errors = await validate(dto);

    if (errors.length) {
      throw new BadRequestException(errors);
    }

    return dto;
  }

  private isNativeType(metatype: ArgumentMetadata['metatype']) {
    if (!metatype) {
      return true;
    }

    const nativeTypes: Function[] = [String, Number, Boolean, Array, Object];
    return nativeTypes.includes(metatype);
  }
}
