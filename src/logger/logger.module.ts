import { Global, Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { AppConfigModule } from '../app-config/app-config.module';
import { AppConfigService } from '../app-config/app-config.service';

@Global()
@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: (configService: AppConfigService) => {
        return {
          pinoHttp: {
            level:
              configService.logLevel === 'log'
                ? 'info'
                : configService.logLevel,
            genReqId: (req) =>
              req.headers['x-request-id'] || crypto.randomUUID(),
            redact: ['password', '*.password'],
            serializers: {
              req: (data) => {
                const { id, method, url } = data;

                return {
                  id,
                  method,
                  url,
                };
              },
              res: (data) => {
                const { statusCode, responseTime } = data;

                return {
                  statusCode,
                  responseTime,
                };
              },
              err: (data) => {
                const { message, type } = data;

                return {
                  message,
                  type,
                };
              },
            },
            transport:
              process.env.NODE_ENV === 'development'
                ? {
                    targets: [
                      {
                        target: 'pino-pretty',
                        options: {
                          colorize: true,
                          singleLine: true,
                        },
                      },
                      {
                        target: 'pino/file',
                        options: {
                          destination:
                            '/Users/ireneemacmini/Documents/logs/app.log',
                          mkdir: true,
                        },
                      },
                    ],
                  }
                : undefined,
          },
        };
      },
      inject: [AppConfigService],
    }),
  ],
})
export class LoggerModule {}
