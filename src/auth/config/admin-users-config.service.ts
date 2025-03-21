import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import adminUsersConfig from './admin-users.config';
import { AdminUserModel } from '../models/admin-user.model';
import { AccessLevelEnum } from '../models/access-level.enum';

@Injectable()
export class AdminUsersConfigService {
  constructor(
    @Inject(adminUsersConfig.KEY)
    private readonly config: ConfigType<typeof adminUsersConfig>,
  ) {}

  get superUser(): AdminUserModel {
    return {
      accessLevel: AccessLevelEnum.SUPER_USER,
      apiKey: this.config.SUPER_USER_API_KEY,
      email: this.config.SUPER_USER_EMAIL,
      username: this.config.SUPER_USER_NAME,
    };
  }

  get systemUser(): AdminUserModel {
    return {
      accessLevel: AccessLevelEnum.SYSTEM_USER,
      apiKey: this.config.SYSTEM_USER_API_KEY,
      email: this.config.SYSTEM_USER_EMAIL,
      username: this.config.SYSTEM_USER_NAME,
    };
  }

  get supportUser(): AdminUserModel {
    return {
      accessLevel: AccessLevelEnum.SUPPORT_USER,
      apiKey: this.config.SUPPORT_USER_API_KEY,
      email: this.config.SUPPORT_USER_EMAIL,
      username: this.config.SUPPORT_USER_NAME,
    };
  }
}
