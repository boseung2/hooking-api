import {
  Query,
  Resolver,
  Root,
  ResolveField,
  ObjectType,
  Field,
  Int,
  Args,
} from '@nestjs/graphql';
import { Board } from '../entity/board.entity';
import User from 'src/users/entity/user.entity';
import { BoardsService } from '../service/boards.service';
import { UsersService } from '../../users/service/users.service';

@ObjectType()
class PaginatedBoards {
  @Field(() => [Board])
  boards: Board[];

  @Field(() => Int, { nullable: true })
  cursor?: Board['id'] | null;
}

@Resolver(Board)
export class BoardsResolver {
  constructor(
    private boardService: BoardsService,
    private usersService: UsersService,
  ) {}

  @Query(() => PaginatedBoards)
  boards(
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 6 })
    limit: number,
    @Args('cursor', { type: () => Int, nullable: true, defaultValue: 1 })
    cursor: Board['id'],
  ): PaginatedBoards {
    return this.boardService.getBoards(limit, cursor);
  }

  @ResolveField(() => User)
  writer(@Root() parentBoard: Board): User | undefined {
    return this.usersService.getUser(parentBoard.writerId);
  }
}
