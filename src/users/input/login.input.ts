import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { User } from '../entity/user.entity';

@InputType({ description: '로그인 인풋 데이터' })
export class LoginInput {
  @Field()
  @IsString()
  emailOrUserId: string;

  @Field()
  @IsString()
  password: string;
}

@ObjectType({ description: '필드 에러 타입' })
export class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType({ description: '로그인 반환 데이터' })
export class LoginResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;

  @Field({ nullable: true })
  accessToken?: string;
}
