import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AppConfigService } from '../../../app-config/app-config.service';

@Injectable()
export class AdminAuthenticationGuard implements CanActivate {
  constructor(private readonly appConfigService: AppConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const headers = request.headers;

    const apiKeys = [
      this.appConfigService.superUserApiKey,
      this.appConfigService.systemUserApiKey,
      this.appConfigService.supportUserApiKey,
    ];

    if (!apiKeys.includes(headers['x-api-key'] as string)) {
      throw new UnauthorizedException('Invalid API Key');
    }

    return true;
  }
}
