/* eslint-disable prettier/prettier */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { LoggerService } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService){
    
  }
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const respones = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    this.logger.error(exception.message, exception.stack);
    respones.status(status).json({
      code: status,
      //   path: request.path,
      time: new Date().toISOString(),
      //   method: request.method,
      message: exception.message || HttpException.name,
    });
    // throw new Error('Method not implemented');
  }
}
