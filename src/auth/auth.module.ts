import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AdminUsersConfigService } from './config/admin-users-config.service';
import adminUsersConfig from './config/admin-users.config';
import { AdminAuthGuard } from './guards/admin-auth/admin-auth.guard';
import { AdminAuthenticationGuard } from './guards/admin-authentication/admin-authentication.guard';
import { AdminAuthorizationGuard } from './guards/admin-authorization/admin-authorization.guard';
import { AuthService } from './auth.service';
import { HashingModule } from '../hashing/hashing.module';

@Module({
  imports: [ConfigModule.forFeature(adminUsersConfig), HashingModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AdminAuthGuard,
    },
    AdminAuthenticationGuard,
    AdminAuthorizationGuard,
    AdminUsersConfigService,
    AuthService,
  ],
})
export class AuthModule {}
