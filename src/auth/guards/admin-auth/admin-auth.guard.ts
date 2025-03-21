import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AdminAuthenticationGuard } from '../admin-authentication/admin-authentication.guard';
import { AdminAuthorizationGuard } from '../admin-authorization/admin-authorization.guard';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(
    private readonly authenticationGuard: AdminAuthenticationGuard,
    private readonly authorizationGuard: AdminAuthorizationGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthenticated = await this.authenticationGuard.canActivate(context);
    const isAuthorized = await this.authorizationGuard.canActivate(context);

    return isAuthenticated && isAuthorized;
  }
}
