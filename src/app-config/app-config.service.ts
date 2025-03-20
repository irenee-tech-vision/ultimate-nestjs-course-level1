import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get seedDataFilePath(): string {
    return this.configService.get<string>('SEED_DATA_FILE_PATH')!;
  }

  get defaultLimit(): number {
    return this.configService.get<number>('DEFAULT_LIMIT')!;
  }

  get mongoUri(): string {
    return this.configService.get<string>('MONGO_URI')!;
  }

  get ormOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get<'postgres' | 'mysql'>('ORM_TYPE'),
      host: this.configService.get<string>('ORM_HOST'),
      port: this.configService.get<number>('ORM_PORT'),
      password: this.configService.get<string>('ORM_PASSWORD'),
      username: this.configService.get<string>('ORM_USERNAME'),
      autoLoadEntities: true,
      synchronize: this.configService.get<boolean>('ORM_SYNCHRONIZE'),
    };
  }

  get superUserApiKey(): string {
    return this.configService.get<string>('SUPER_USER_API_KEY')!;
  }
}
