import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/roles/roles.entity';
import { conditionUtils } from 'src/utils/db.helper';
import { In, Repository } from 'typeorm';
import { Logs } from '../logs/log.entity';
import { GetUserQuery } from './dto/get-user-dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Logs) private readonly logsRepository: Repository<Logs>,
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}

  async findAll(query: GetUserQuery) {
    const { limit, page, username, gender, role } = query;
    const take = limit || 10;
    const skip = ((page || 1) - 1) * take;
    const obj = {
      'user.username': username,
      'profile.gender': gender,
      'roles.id': role,
    };
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.roles', 'roles');

    const newQuery = conditionUtils<User>(queryBuilder, obj);
    // const res = await this.userRepository.find({
    //   select: {
    //     id: true,
    //     username: true,
    //     profile: {
    //       gender: true,
    //     },
    //     roles: {
    //       name: true,
    //     },
    //   },
    //   relations: {
    //     profile: true,
    //     roles: true,
    //   },
    //   where: {
    //     username,
    //     profile: {
    //       gender,
    //     },
    //     roles: {
    //       id: role,
    //     },
    //   },
    //   take,
    //   skip,
    // });
    return newQuery.take(take).skip(skip).getMany();
  }
  find(username: string) {
    return this.userRepository.findOne({
      where: { username },
    });
  }
  async create(user: Partial<User>) {
    if (!user.roles) {
      const roles = await this.rolesRepository.findOne({ where: { id: 2 } });
      user.roles = [roles];
      console.log('user.roles', user.roles);
    }
    if (user.roles instanceof Array && typeof user.roles[0] === 'number') {
      user.roles = await this.rolesRepository.find({
        where: {
          id: In(user.roles),
        },
      });
    }
    const usertmp = await this.userRepository.create(user);
    return this.userRepository.save(usertmp);
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, user: Partial<User>) {
    if (user.roles instanceof Array && typeof user.roles[0] === 'number') {
      user.roles = await this.rolesRepository.find({
        where: {
          id: In(user.roles),
        },
      });
    }
    const userTemp = await this.findPorfile(id);
    const newUser = this.userRepository.merge(userTemp, user);
    // 联合模型更新需要使用save或者querybuilder
    return this.userRepository.save(newUser);
    // 下面的方法只适合单模型更新 不适合有关系的模型更新
    // return this.userRepository.update(id, user);
  }
  async remove(id: number) {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
    // return this.userRepository.delete(id);
  }
  findPorfile(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: {
        profile: true,
      },
    });
  }
  async findUserByGroup(id: number) {
    const res = await this.logsRepository
      .createQueryBuilder('logs')
      .select('logs.result', 'result')
      .addSelect('COUNT("logs.result")', 'count')
      .leftJoinAndSelect('logs.user', 'user')
      .where('user.id = :id', { id })
      .groupBy('logs.result')
      .orderBy('result', 'DESC')
      .addOrderBy('count', 'DESC')
      .limit(1)
      .offset(1)
      .getRawMany();
    return res;
  }

  async findUserLogs(id: number) {
    const user = await this.findOne(id);
    return this.logsRepository.find({
      where: {
        user: user.logs,
      },
      // relations: {
      //   user: true,
      // },
    });
  }
}
