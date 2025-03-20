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

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_METADATA_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    
    return (
      this.authenticationGuard.canActivate(context) &&
      this.authorizationGuard.canActivate(context)
    );
  }
}
