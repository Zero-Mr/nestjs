/* eslint-disable prettier/prettier */
import { User } from '../user/user.entity';
import {OneToMany, Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Logs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @Column()
  method: string;

  @Column()
  data: string;

  @Column()
  result: number;

  @ManyToOne(()=> User,(user)=>user.logs)
  @JoinColumn()
  user:User
}
