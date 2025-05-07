import { ConsoleLogger, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { DbType } from './db-type.enum';
import { AmazingLogger } from './logger/amazing-logger';

async function bootstrap() {
  const appDataDb = (process.env.APP_DATA_DB as DbType) ?? DbType.IN_MEMORY;

  const app = await NestFactory.create(
    AppModule.register({
      appDataDb,
      appAnalyticsDb: DbType.IN_MEMORY,
    }),
    {
      bufferLogs: true
    }
  );

  app.useLogger(app.get(AmazingLogger))
  app.use(cors(), helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableShutdownHooks();

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().then(() => {
  const logger = new Logger()
  logger.log('Server is running');
});
