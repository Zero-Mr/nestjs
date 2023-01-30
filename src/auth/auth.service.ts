import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { In, Repository } from 'typeorm';
import { GetUserQuery } from 'src/user/dto/get-user-dto';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
@Injectable()
export class AuthService {
  //   constructor() {}
  constructor(private userServive: UserService, private jwt: JwtService) {}
  async signin(username: string, password: string) {
    // const res = await this.userServive.findAll({ username } as GetUserQuery);
    const user = await this.userServive.find(username);
    if (user && user.password === password) {
      return await this.jwt.signAsync(
        {
          username: user.username,
          sub: user.id,
        },
        {
          expiresIn: '1d',
        },
      );
    }
    return new UnauthorizedException();
  }
  async signup(username: string, password: string) {
    const res = await this.userServive.create({
      username,
      password,
    });
    return res;
  }
}
