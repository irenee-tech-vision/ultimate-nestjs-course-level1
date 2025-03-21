import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AppConfigService } from '../../../app-config/app-config.service';
import { AccessLevelEnum } from '../../models/access-level.enum';
import { GrantAccess } from '../../decorators/grant-access/grant-access.decorator';
import { AuthService } from '../../auth.service';

@Injectable()
export class AdminAuthorizationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const accessLevel =
      this.reflector.getAllAndOverride(GrantAccess, [
        context.getHandler(),
        context.getClass(),
      ]) ?? AccessLevelEnum.SUPER_USER;

    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'];

    const adminUser = this.authService.getAdminUserByApiKey(apiKey);

    const isAuthorized =
      adminUser && this.hasRequiredAccess(adminUser.accessLevel, accessLevel);

    if (!isAuthorized) {
      throw new ForbiddenException(
        `Resource not accessible: You need at least ${accessLevel} access level`,
      );
    }

    return true;
  }

  private hasRequiredAccess(
    userLevel: AccessLevelEnum,
    requiredLevel: AccessLevelEnum,
  ): boolean {
    const accessHierarchy = [
      AccessLevelEnum.SUPPORT_USER,
      AccessLevelEnum.SYSTEM_USER,
      AccessLevelEnum.SUPER_USER,
    ];

    const userLevelIndex = accessHierarchy.indexOf(userLevel);
    const requiredLevelIndex = accessHierarchy.indexOf(requiredLevel);

    return userLevelIndex >= requiredLevelIndex;
  }
}
