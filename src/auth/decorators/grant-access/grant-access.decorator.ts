import { Reflector } from '@nestjs/core';
import { AccessLevelEnum } from './access-level.enum';

export const GrantAccess = Reflector.createDecorator<AccessLevelEnum>()
