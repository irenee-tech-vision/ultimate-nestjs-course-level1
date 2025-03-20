import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppConfigModule } from '../app-config/app-config.module';
import { AdminAuthenticationGuard } from './guards/admin-authentication/admin-authentication.guard';
import { AdminAuthorizationGuard } from './guards/admin-authorization/admin-authorization.guard';
import { AdminAuthGuard } from './guards/admin-auth/admin-auth.guard';

@Module({
  imports: [AppConfigModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AdminAuthGuard,
    },
    AdminAuthenticationGuard,
    AdminAuthorizationGuard,
  ],
})
export class AuthModule {}
