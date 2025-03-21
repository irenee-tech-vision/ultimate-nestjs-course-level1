import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashingService } from '../hashing/hashing.service';
import { UsersService } from '../users/services/users.service';
import { AdminUsersConfigService } from './config/admin-users-config.service';
import { UserLoginSuccessDto } from './dto/user-login-success.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { AdminUserModel } from './models/admin-user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly adminUsersConfigService: AdminUsersConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async loginUser(loginDto: UserLoginDto): Promise<UserLoginSuccessDto> {
    const authError = new UnauthorizedException('Invalid credentials');
    const user = await this.usersService.findUserByUsername(loginDto.username);
    if (!user) {
      throw authError;
    }

    const isPasswordValid = await this.hashingService.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw authError;
    }

    const accessToken = await this.jwtService.signAsync({
      username: user.username,
    });

    return {
      accessToken,
    };
  }

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
