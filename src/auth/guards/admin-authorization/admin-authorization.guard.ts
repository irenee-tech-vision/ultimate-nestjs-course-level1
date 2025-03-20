import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AppConfigService } from '../../../app-config/app-config.service';
import { AccessLevelEnum } from '../../decorators/grant-access/access-level.enum';
import { GrantAccess } from '../../decorators/grant-access/grant-access.decorator';

@Injectable()
export class AdminAuthorizationGuard implements CanActivate {
  private readonly accessMap: Map<AccessLevelEnum, string[]>;

  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly reflector: Reflector,
  ) {
    const superUserKey = this.appConfigService.superUserApiKey;
    const systemUserKey = this.appConfigService.systemUserApiKey;
    const supportUserKey = this.appConfigService.supportUserApiKey;

    this.accessMap = new Map([
      [AccessLevelEnum.SUPER_USER, [superUserKey]],
      [AccessLevelEnum.SYSTEM_USER, [systemUserKey, superUserKey]],
      [
        AccessLevelEnum.SUPPORT_USER,
        [supportUserKey, systemUserKey, superUserKey],
      ],
    ]);
  }

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

    const isAuthorized = this.accessMap.get(accessLevel)?.includes(apiKey);

    if (!isAuthorized) {
      throw new ForbiddenException(
        `Resource not accessible: You need at least ${accessLevel} access level`,
      );
    }

    return true;
  }
}
