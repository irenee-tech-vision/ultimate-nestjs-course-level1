import { AuthStrategyEnum } from '../../models/auth-strategy.enum';
import { SetAuthStrategy } from '../set-auth-strategy/set-auth-strategy.decorator';

export const IsPublic = () => SetAuthStrategy(AuthStrategyEnum.NONE);
