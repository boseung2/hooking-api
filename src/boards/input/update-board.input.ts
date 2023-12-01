import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType({ description: '게시판 수정 인풋 데이터' })
export class UpdateBoardInput {
  @Field()
  @IsNumber()
  id: number;

  @Field()
  @IsString()
  type: string;

  @Field()
  @IsString()
  content: string;
}
