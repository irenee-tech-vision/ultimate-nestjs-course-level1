import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs/promises';
import * as yaml from 'yaml';
import { AppModule } from './app.module';
import { DbType } from './db-type.enum';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule.register({
      appDataDb: DbType.IN_MEMORY,
      appAnalyticsDb: DbType.IN_MEMORY,
    }),
  );

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
}

bootstrap().then(() => {
  const logger = new Logger();
  logger.log('Server is running');
});
