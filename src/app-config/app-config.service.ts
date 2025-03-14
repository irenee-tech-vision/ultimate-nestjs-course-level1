import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

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
}
