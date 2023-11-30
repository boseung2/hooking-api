import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Board } from './board.entity';
import { User } from 'src/users/entity/user.entity';

@ObjectType()
@Entity()
export class BoardLike {
  @Field(() => Int, { description: '유저 고유 아이디' })
  @PrimaryColumn()
  userId: number;

  @Field(() => Int, { description: '게시판 고유 아이디' })
  @PrimaryColumn()
  boardId: number;

  @Field(() => Board, { description: '좋아요 누른 게시글' })
  board: Board;

  @Field(() => User, { description: '좋아요 누른 유저' })
  @ManyToOne(() => User, (user) => user.boardLikes)
  user: User;
}
