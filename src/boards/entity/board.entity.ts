import { Field, ObjectType } from '@nestjs/graphql';
import { Int } from 'type-graphql';

@ObjectType()
export class Board {
  @Field(() => Int, { description: '게시글 고유 아이디' })
  id: number;

  @Field(() => String, { description: '게시글 타입' })
  type: string;

  @Field({ description: '게시글 본문' })
  content: string;

  @Field(() => Int, { description: '작성자 ID' })
  writerId: number;

  @Field(() => Int, { description: '조회수' })
  views: number;

  @Field(() => Int, { description: '좋아요 수' })
  likes: number;

  @Field({ description: '생성일' })
  createDate: Date;

  @Field({ description: '수정일' })
  modifiedDate: Date;
}
