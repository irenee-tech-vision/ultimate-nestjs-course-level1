import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DbType } from './db-type.enum';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const appDataDb = (process.env.APP_DATA_DB as DbType) ?? DbType.IN_MEMORY;

  const app = await NestFactory.create(
    AppModule.register({
      appDataDb,
      appAnalyticsDb: DbType.IN_MEMORY,
    }),
  );

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
bootstrap();
