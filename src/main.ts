import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createLogger } from 'winston';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/all-exception.filter';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
async function bootstrap() {
  const instance = createLogger({
    transports: [],
  });
  // const logger = WinstonModule.createLogger({
  //   instance,
  // });
  const app = await NestFactory.create(AppModule, {
    // logger: ['error', 'warn'],
    // logger,
  });
  const httpAdapter = app.get(HttpAdapterHost);
  app.setGlobalPrefix('api/v1');
  // app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  // app.useGlobalFilters(new HttpExceptionFilter(httpAdapter));
  app.useGlobalPipes(
    new ValidationPipe({
      //whitelist: true
    }),
  );
  const port = 3000;
  await app.listen(port);
}
bootstrap();
