/* eslint-disable prettier/prettier */
import {
    ExceptionFilter,
    HttpAdapterHost,
    HttpException,
    ArgumentsHost,
    HttpStatus,
    LoggerService,
    Catch,
    Inject,
  } from '@nestjs/common';
  import * as requestIp from 'request-ip'
  import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { QueryFailedError, TypeORMError } from 'typeorm';
  @Catch()
  export class HttpExceptionFilter implements ExceptionFilter {
    constructor(
        // private readonly logger: LoggerService,
        private readonly HttpAdapterHost: HttpAdapterHost,
        // @Inject(WINSTON_MODULE_NEST_PROVIDER)
        // private readonly logger: LoggerService,
        ){
      
    }
    catch(exception: unknown, host: ArgumentsHost) {
      const { httpAdapter } = this.HttpAdapterHost;
      const ctx = host.switchToHttp();
      const respones = ctx.getResponse();
      const request = ctx.getRequest();
    //   const status = exception.getStatus();
    //   this.logger.error(exception.message, exception.stack);
    //   respones.status(status).json({
    //     code: status,
    //     //   path: request.path,
    //     time: new Date().toISOString(),
    //     //   method: request.method,
    //     message: exception.message || HttpException.name,
    //   });
      // throw new Error('Method not implemented');
      const httpStatus = 
      exception instanceof HttpException ?
      exception.getStatus()
      :
      HttpStatus.INTERNAL_SERVER_ERROR

      const msgs = exception['response'] || '服务器错误'
      // if(exception instanceof QueryFailedError){
      //   msgs = exception.message 
      //   if(exception.driverError.errno === 1062){
      //     msgs = '用户名已存在'
      //   }
      // }

      const responesBody = {
        method:request.method,
        Headers:request.Headers,
        query:request.query,
        body:request.body,
        params:request.params,
        time:new Date().toISOString(),
        ip:requestIp.getClientIp(request),
        exception:exception['name'],
        error:msgs
      }
      // this.logger.error(['错误'], HttpStatus);
      httpAdapter.reply(respones,responesBody,httpStatus)
    }
  }
  