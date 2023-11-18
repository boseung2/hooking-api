import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType({ description: '게시판 생성 인풋 데이터' })
export class CreateBoardInput {
  @Field()
  @IsString()
  type: string;

  @Field()
  @IsString()
  content: string;
}
