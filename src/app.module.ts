import { Global, Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import * as dotenv from 'dotenv';
import configyan from './configyml';
const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`;
import * as config from 'config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigEnum } from './enum/config.enum';
import { UserModule } from './user/user.module';
import * as Joi from 'joi';

import { LoggerModule } from 'nestjs-pino';
import { LogsModule } from './logs/logs.module';
import { connectionParams } from '../ormconfig';
import { AuthModule } from './auth/auth.module';
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production'),
        DB_HOST: Joi.string().default(3060),
        DB: Joi.string(),
      }),
      // load: [() => dotenv.config({ path: '.env' })],
      // load: [configyan],
    }),
    TypeOrmModule.forRoot(connectionParams),
    UserModule,
    LogsModule,
    AuthModule,
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'bobo123',
    //   database: 'testdb',
    //   entities: [],
    //   synchronize: true,
    //   logging: ['error'],
    // }),
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
  exports: [Logger],
})
export class AppModule {}
