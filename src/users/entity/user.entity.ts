import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class User {
  @Field(() => Int)
  id!: number;

  @Field({ description: '유저 이름' })
  username: string;

  @Field({ description: '유저 이메일' })
  email: string;

  password: string;

  @Field(() => String, { description: '생성 일자' })
  createdAt: Date;

  @Field(() => String, { description: '업데이트 일자' })
  updatedAt: Date;
}
