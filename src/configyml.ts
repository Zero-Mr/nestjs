/* eslint-disable prettier/prettier */
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import * as _ from 'loadsh'
const Yaml_NAME_default = 'config.yml';

const filepath_default = join(__dirname, '../config', Yaml_NAME_default);
console.log(__dirname)
console.log(filepath_default,'filepath_default')

const commonCongif = yaml.load(readFileSync(filepath_default, 'utf-8'));

const envPath = join(__dirname, '../config', `config.${process.env.NODE_ENV || 'development'}.yml`);

const envconfig = yaml.load(readFileSync(envPath, 'utf-8'));

export default () => {
  return _.merge(commonCongif,envconfig)
};
