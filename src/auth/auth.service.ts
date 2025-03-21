import { Injectable } from '@nestjs/common';
import { AdminUsersConfigService } from './config/admin-users-config.service';
import { AdminUserModel } from './models/admin-user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminUsersConfigService: AdminUsersConfigService,
  ) {}

  getAdminUserByApiKey(apiKey: string): AdminUserModel | undefined {
    if (!apiKey) {
      return undefined;
    }

    const superUser = this.adminUsersConfigService.superUser;
    const systemUser = this.adminUsersConfigService.systemUser;
    const supportUser = this.adminUsersConfigService.supportUser;

    return [superUser, systemUser, supportUser].find(
      (user) => user.apiKey === apiKey,
    );
  }
}
