import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AdminAuthenticationGuard } from '../admin-authentication/admin-authentication.guard';
import { AdminAuthorizationGuard } from '../admin-authorization/admin-authorization.guard';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_METADATA_KEY } from '../../decorators/is-public/constants';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(
    private readonly authenticationGuard: AdminAuthenticationGuard,
    private readonly authorizationGuard: AdminAuthorizationGuard,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_METADATA_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const isAuthenticated = await this.authenticationGuard.canActivate(context);
    const isAuthorized = await this.authorizationGuard.canActivate(context);

    return isAuthenticated && isAuthorized;
  }
}
