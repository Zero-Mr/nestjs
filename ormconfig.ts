/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Logs } from './src/logs/log.entity';
import { Roles } from './src/roles/roles.entity';
import { Profile } from './src/user/profile.entity';
import { User } from './src/user/user.entity';
import * as fs from 'fs'
import * as dotenv from 'dotenv'
import { ConfigEnum } from './src/enum/config.enum';
const getEnv = (env:string) :Record<string,unknown>=>{
  if(fs.existsSync(env)){
    return dotenv.parse(fs.readFileSync(env))
  } else{
    return {}
  }
}

const buildConnectionOptions = ()=>{
  const defaultConfig = getEnv('.env')
  const envConfig = getEnv(`.env.${process.env.NODE_ENV}`)
  const config = {...defaultConfig,...envConfig}
  return {
    type:config[ConfigEnum.DB],
    host: config[ConfigEnum.DB_HOST],
    port: config[ConfigEnum.DB_PORT],
    username: config[ConfigEnum.DB_USERNAME],
    password: config[ConfigEnum.DB_PASSWORD],
    database: config[ConfigEnum.DB_DATABASE],
    entities: [User, Profile, Logs, Roles],
    synchronize: true,
    // logging: ['error'],
    logging: true,
  } as TypeOrmModuleOptions
}




export const connectionParams = buildConnectionOptions();


export default new DataSource({
  ...connectionParams,
  migrations:['src/migrations/**'],
  subscribers:[]
} as DataSourceOptions)