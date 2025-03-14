import { Module } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        SEED_DATA_FILE_PATH: Joi.string()
          .optional()
          .default('fixtures/seed-data.json')
          .regex(/\.json$/),
        DEFAULT_LIMIT: Joi.number().optional().integer().positive().default(10),
      }),
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}

