import { Reflector } from '@nestjs/core';
import { AccessLevelEnum } from '../../models/access-level.enum';

export const GrantAccess = Reflector.createDecorator<AccessLevelEnum>()
