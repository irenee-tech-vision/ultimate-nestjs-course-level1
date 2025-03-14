import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get seedDataFilePath(): string {
    return this.configService.get(
      'SEED_DATA_FILE_PATH',
      'fixtures/seed-data.json',
    );
  }

  get defaultLimit(): number {
    return parseInt(this.configService.get('DEFAULT_LIMIT', '10'));
  }
}
