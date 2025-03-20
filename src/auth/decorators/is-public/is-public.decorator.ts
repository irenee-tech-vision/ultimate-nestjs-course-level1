import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_METADATA_KEY } from './constants';

export const IsPublic = (isPublic: boolean) =>
  SetMetadata(IS_PUBLIC_METADATA_KEY, isPublic);
