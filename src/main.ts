import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';
import * as fs from 'fs/promises';
import * as yaml from 'yaml';
import helmet from 'helmet';
import { Logger as PinoLogger } from 'nestjs-pino';
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
      bufferLogs: true,
    },
  );

  app.useLogger(app.get(PinoLogger));
  app.use(cors(), helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableShutdownHooks();

  const config = new DocumentBuilder()
    .setTitle('Habits Tracker API')
    .setDescription('API that helps users track their habits')
    .addSecurity('admin', {
      type: 'apiKey',
      name: 'x-api-key',
      in: 'header',
    })
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory());

  await fs.writeFile('api.json', JSON.stringify(documentFactory(), null, 2));
  await fs.writeFile('api.yaml', yaml.stringify(documentFactory()));

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().then(() => {
  const logger = new Logger();
  logger.log('Server is running');
});
