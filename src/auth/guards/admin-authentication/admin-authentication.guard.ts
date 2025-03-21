import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AppConfigService } from '../../../app-config/app-config.service';
import { AuthService } from '../../auth.service';

@Injectable()
export class AdminAuthenticationGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const headers = request.headers;
    const apiKey = headers['x-api-key'];

    const adminUser = this.authService.getAdminUserByApiKey(apiKey as string);
    if (!adminUser) {
      throw new UnauthorizedException('Invalid API Key');
    }

    request['adminUser'] = adminUser;
    return true;
  }
}
