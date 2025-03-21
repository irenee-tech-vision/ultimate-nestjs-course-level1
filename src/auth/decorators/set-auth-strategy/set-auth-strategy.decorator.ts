import { Reflector } from '@nestjs/core';
import { AuthStrategyEnum } from '../../models/auth-strategy.enum';

export const SetAuthStrategy = Reflector.createDecorator<AuthStrategyEnum>()
