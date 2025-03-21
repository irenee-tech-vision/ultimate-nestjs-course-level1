import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { SetAuthStrategy } from '../../decorators/set-auth-strategy/set-auth-strategy.decorator';
import { AuthStrategyEnum } from '../../models/auth-strategy.enum';
import { AdminAuthGuard } from '../admin-auth/admin-auth.guard';
import { UserAuthGuard } from '../user-auth/user-auth.guard';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly adminAuthGuard: AdminAuthGuard,
    private readonly userAuthGuard: UserAuthGuard,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const strategy =
      this.reflector.getAllAndOverride<AuthStrategyEnum>(SetAuthStrategy, [
        context.getHandler(),
        context.getClass(),
      ]) ?? AuthStrategyEnum.ADMIN_API_KEY;

    switch (strategy) {
      case AuthStrategyEnum.NONE:
        return true;
      case AuthStrategyEnum.ADMIN_API_KEY:
        return this.adminAuthGuard.canActivate(context);
      case AuthStrategyEnum.USER_JWT:
        return this.userAuthGuard.canActivate(context);
      default:
        return this.adminAuthGuard.canActivate(context);
    }
  }
}
