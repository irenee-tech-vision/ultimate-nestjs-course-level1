import { repl } from '@nestjs/core';
import { HashingModule } from './hashing/hashing.module';

async function bootstrap() {
  await repl(HashingModule);
}

bootstrap();
