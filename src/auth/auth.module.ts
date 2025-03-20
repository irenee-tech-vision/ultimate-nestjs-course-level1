import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppConfigModule } from '../app-config/app-config.module';
import { AdminAuthenticationGuard } from './guards/admin-authentication/admin-authentication.guard';

@Module({
  imports: [AppConfigModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AdminAuthenticationGuard,
    },
  ],
})
export class AuthModule {}
