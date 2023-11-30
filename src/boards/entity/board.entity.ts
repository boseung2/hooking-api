import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Board {
  @Field(() => Int, { description: '게시글 고유 아이디' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { description: '게시글 타입' })
  @Column({ comment: '게시글 타입' })
  type: string;

  @Field({ description: '게시글 본문' })
  @Column('longtext', { comment: '게시글 본문' })
  content: string;

  @Field(() => Int, { description: '작성자 ID' })
  @Column({ comment: '유저 아이디' })
  writerId: number;

  @Field(() => Int, { description: '조회수' })
  @Column({ comment: '조회수' })
  views: number;

  @Field(() => Int, { description: '좋아요 수' })
  @Column({ comment: '좋아요 수' })
  likes: number;

  @Field(() => Int, { description: '댓글 수' })
  @Column({ comment: '댓글 수' })
  reviews: number;

  @Field({ description: '생성일' })
  @CreateDateColumn({ comment: '생성 일자' })
  createDate: Date;

  @Field({ description: '수정일' })
  @UpdateDateColumn({ comment: '업데이트 일자' })
  modifiedDate: Date;
}
