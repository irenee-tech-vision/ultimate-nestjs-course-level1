import { AccessLevelEnum } from './access-level.enum';

export class AdminUserModel {
  accessLevel: AccessLevelEnum;
  apiKey: string;
  email?: string;
  username?: string;
}
