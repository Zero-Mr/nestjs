import { ParseIntPipe } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { Req } from '@nestjs/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  LoggerService,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { TypeormFilter } from 'src/filters/typeorm.filter';
import { CreateUserDot } from './dto/create-user-dto';
import { GetUserQuery } from './dto/get-user-dto';
import { CreateUserPipe } from './pipes/create-user/create-user.pipe';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
@UseFilters(new TypeormFilter())
export class UserController {
  // private logger = new Logger(UserController.name);
  constructor(
    private userService: UserService,

    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {
    this.logger.log('151dasd');
  }

  @Get('/getUser/:id')
  getUser(): any {
    return 'hello wrod';
  }
  @Get('/getUsers')
  async getUsers(@Query() query: GetUserQuery): Promise<any> {
    // this.logger.warn('warn getUsers 请求成功');
    // this.logger.log('log getUsers 请求成功');
    console.log(query);

    return await this.userService.findAll(query);
  }

  @Post('/adduser')
  addUser(@Body(CreateUserPipe) dto: CreateUserDot): any {
    const user = dto as User;
    return this.userService.create(user);
  }
  @Post('/remove')
  remove(): any {
    return this.userService.remove(30);
  }

  @Get('/profile')
  @UseGuards(AuthGuard('jwt'))
  async getUserProfile(
    @Query('id', ParseIntPipe) id: any,
    @Req() req,
  ): Promise<any> {
    console.log('reqreqreq', req.user);
    const res = await this.userService.findPorfile(id);
    res['user'] = req.user;
    return res;
  }
  @Get('/logs')
  getUserLogs(): any {
    return this.userService.findUserLogs(2);
  }

  @Delete('/deleteUser/:id')
  removeUser(@Param('id') id: any) {
    console.log(id);
    return this.userService.remove(id);
  }

  @Patch('upDateUser/:id')
  upDateUser(@Body() dto: any, @Param('id', ParseIntPipe) id: number): any {
    const user = dto as User;
    return this.userService.update(id, user);
  }

  @Get('/logByGroup')
  async logByGroup(): Promise<any> {
    const res = await this.userService.findUserByGroup(2);
    return res.map((o) => ({
      result: o.result,
      count: o.count,
    }));
  }
}
