/* eslint-disable prettier/prettier */
import { Logs } from '../logs/log.entity';
import { Roles } from '../roles/roles.entity';
import { AfterInsert, BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from './profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true}) 
  username: string;

  @Column()
  password: string;

  @OneToMany(()=> Logs,(logs)=>logs.user,{cascade:true})
  logs:Logs[]

  @ManyToMany(()=>Roles,(roles)=>roles.users,{cascade:['insert']})
  @JoinTable({name:"user_roles"})
  roles:Roles[]

  @OneToOne(()=> Profile,(profile)=>profile.user,{cascade:true})
  profile:Profile

  @AfterInsert()
  afterInsert(){
    console.log('AfterInsert',this.id,this.username)
  }

  @BeforeInsert()
  beforeInsert(){
    console.log('BeforeInsert')
  }

}
