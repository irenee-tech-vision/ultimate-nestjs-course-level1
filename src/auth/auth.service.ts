import { Injectable } from '@nestjs/common';
import { AdminUsersConfigService } from './config/admin-users-config.service';
import { AdminUserModel } from './models/admin-user.model';
import { HashingService } from '../hashing/hashing.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly adminUsersConfigService: AdminUsersConfigService,
  ) {}

  async getAdminUserByApiKey(
    apiKey: string,
  ): Promise<AdminUserModel | undefined> {
    if (!apiKey) {
      return undefined;
    }

    const superUser = this.adminUsersConfigService.superUser;
    const systemUser = this.adminUsersConfigService.systemUser;
    const supportUser = this.adminUsersConfigService.supportUser;

    const adminUsers = [superUser, systemUser, supportUser];
    let adminUser: AdminUserModel | undefined;

    for await (const user of adminUsers) {
      if (await this.hashingService.compare(apiKey, user.apiKey)) {
        adminUser = user;
        break;
      }
    }

    return adminUser;
  }
}
