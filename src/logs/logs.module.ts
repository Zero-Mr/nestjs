import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WinstonModule, WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';
import { Console } from 'winston/lib/winston/transports';
import { utilities } from 'nest-winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { LogEnum } from '../enum/config.enum';

const createDailyRotateTranporrt = (level: string, filename: string) => {
  return new DailyRotateFile({
    level,
    filename: `${filename}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    dirname: 'logs',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.simple(),
    ),
  });
};

@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const consoleTransports = new Console({
          level: 'info',
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike(),
          ),
        });
        const isLOG_ON =
          configService.get(LogEnum.LOG_ON) === 'false' ? false : true;

        // console.log(
        //   configService.get(LogEnum.LOG_ON)
        //     ? configService.get(LogEnum.LOG_ON) + '打开'
        //     : configService.get(LogEnum.LOG_ON) + '关闭',
        // );
        return {
          transports: [
            consoleTransports,
            ...(isLOG_ON
              ? [
                  createDailyRotateTranporrt('info', 'application'),
                  createDailyRotateTranporrt('warn', 'error'),
                ]
              : []),
          ],
        } as WinstonModuleOptions;
      },
    }),
  ],
})
export class LogsModule {}
