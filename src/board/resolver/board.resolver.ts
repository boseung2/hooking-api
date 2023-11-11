import { Query, Resolver } from '@nestjs/graphql';
import { Board } from '../entity/board.entity';
import { BoardData } from '../entity/boardData';

@Resolver(Board)
export class BoardResolver {
  @Query(() => [Board])
  boards(): Board[] {
    return BoardData;
  }
}
