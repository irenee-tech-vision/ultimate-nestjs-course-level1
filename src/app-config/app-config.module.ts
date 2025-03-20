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
        MONGO_URI: Joi.string()
          .optional()
          .default('mongodb://localhost:27017/habit-tracker'),

        // ORM
        ORM_TYPE: Joi.string().valid('postgres', 'mysql').default('postgres'),
        ORM_HOST: Joi.string(),
        ORM_PORT: Joi.number().positive().default(5432),
        ORM_PASSWORD: Joi.string(),
        ORM_USERNAME: Joi.string(),
        ORM_SYNCHRONIZE: Joi.boolean().default(false),

        SUPER_USER_API_KEY: Joi.string().optional().default('1234567890'),
      }),
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
