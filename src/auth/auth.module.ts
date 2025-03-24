import { DynamicModule, Module, Type } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AdminUsersConfigService } from './config/admin-users-config.service';
import adminUsersConfig from './config/admin-users.config';
import { AdminAuthGuard } from './guards/admin-auth/admin-auth.guard';
import { AdminAuthenticationGuard } from './guards/admin-authentication/admin-authentication.guard';
import { AdminAuthorizationGuard } from './guards/admin-authorization/admin-authorization.guard';
import { AuthService } from './auth.service';
import { HashingModule } from '../hashing/hashing.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import jwtOptionsConfig from './config/jwt-options.config';
import { UserAuthGuard } from './guards/user-auth/user-auth.guard';
import { AuthGuard } from './guards/auth/auth.guard';

@Module({
  imports: [
    ConfigModule.forFeature(adminUsersConfig),
    HashingModule,
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(jwtOptionsConfig)],
      useFactory: (jwtOptions: ConfigType<typeof jwtOptionsConfig>) => {
        return {
          secret: jwtOptions.JWT_SECRET,
          signOptions: {
            expiresIn: jwtOptions.JWT_EXPIRES_IN,
          },
        };
      },
      inject: [jwtOptionsConfig.KEY],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useExisting: AuthGuard,
    },
    AuthGuard,
    AdminAuthGuard,
    UserAuthGuard,
    AdminAuthenticationGuard,
    AdminAuthorizationGuard,
    AdminUsersConfigService,
    AuthService,
  ],
  controllers: [AuthController],
})
export class AuthModule {
  static withUsersModule(usersModule: Type | DynamicModule): DynamicModule {
    return {
      module: AuthModule,
      imports: [usersModule],
    };
  }
}
