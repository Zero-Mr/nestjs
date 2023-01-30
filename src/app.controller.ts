import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from './enum/config.enum';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get()
  getHello(): object {
    // const url = this.configService.get('BASE_URL');
    // console.log(url);
    // const RESULT =
    //   this.configService.get(ConfigEnum.DB) +
    //   ':' +
    //   this.configService.get(ConfigEnum.DB_HOST) +
    //   '-' +
    //   url;
    const RESULT = this.configService.get('db');
    return RESULT;
  }
}
