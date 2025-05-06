import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { DbType } from './db-type.enum';

async function bootstrap() {
  const appDataDb = (process.env.APP_DATA_DB as DbType) ?? DbType.IN_MEMORY;

  const app = await NestFactory.create(
    AppModule.register({
      appDataDb,
      appAnalyticsDb: DbType.IN_MEMORY,
    }),
    {
      logger: new ConsoleLogger({
        json: true,
        colors: true,
        compact: false,
      })
    }
  );

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
  console.log('Server is running');
});
