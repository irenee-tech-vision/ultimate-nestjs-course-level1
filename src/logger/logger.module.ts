import { Global, Module } from '@nestjs/common';
import { AppConfigModule } from '../app-config/app-config.module';
import { AmazingLogger } from './amazing-logger';

@Global()
@Module({
  imports: [AppConfigModule],
  providers: [AmazingLogger],
  exports: [AmazingLogger]
})
export class LoggerModule {}
