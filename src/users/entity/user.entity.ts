import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field({ description: '유저 아이디' })
  @Column({ unique: true, comment: '유저 아이디' })
  userId: string;

  @Field({ description: '유저 이름' })
  @Column({ unique: true, comment: '유자 이름' })
  username: string;

  @Field({ description: '유저 이메일' })
  @Column({ unique: true, comment: '유저 이메일' })
  email: string;

  @Column({ comment: '비밀번호' })
  password: string;

  @Field({ description: '생성 일자' })
  @CreateDateColumn({ comment: '생성 일자' })
  createdAt: Date;

  @Field({ description: '업데이트 일자' })
  @UpdateDateColumn({ comment: '업데이트 일자' })
  updatedAt: Date;
}
