import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { DtoInput } from '../../dto/dto-input';

@Injectable()
export class ValidateDtoInputPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const isDtoInput = metadata.metatype?.prototype instanceof DtoInput;

    if (isDtoInput) {
      const dto = new metadata.metatype();
      dto.validate(value);
      return dto.toInstance(value);
    }

    return value;
  }
}
