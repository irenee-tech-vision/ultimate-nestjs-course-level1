import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Optional,
  PipeTransform
} from '@nestjs/common';

@Injectable()
export class UserIdPipe implements PipeTransform<string, Promise<number>> {
  constructor(
    @Optional()
    private readonly errorMsg?: string,
  ) {}

  async transform(value: string, metadata: ArgumentMetadata) {
    const userId = parseInt(value);

    if (isNaN(userId)) {
      throw new BadRequestException(
        this.errorMsg ?? 'Invalid user id: id must be a number',
      );
    }

    return userId;
  }
}
