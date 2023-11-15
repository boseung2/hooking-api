import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType({ description: '회원가입 인풋 데이터' })
export class SignUpInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  username: string;

  @Field()
  @IsString()
  userId: string;

  @Field()
  @IsString()
  password: string;
}
