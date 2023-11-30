import {
  Query,
  Resolver,
  Root,
  ResolveField,
  ObjectType,
  Field,
  Int,
  Args,
  Mutation,
} from '@nestjs/graphql';
import { Board } from '../entity/board.entity';
import { User } from 'src/users/entity/user.entity';
import { BoardsService } from '../service/boards.service';
import { UsersService } from '../../users/service/users.service';
import { CreateBoardInput } from '../input/create-board.input';
import { GqlAuthGuard } from 'src/auth/guard/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { BoardLikeLoader } from '../loader/board-like.loader';
import * as DataLoader from 'dataloader';
import { Loader } from 'nestjs-dataloader';
import { BoardLike } from '../entity/board-like.entity';

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

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Board)
  async createBoard(
    @CurrentUser() userId: number,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ) {
    return this.boardService.createBoard(userId, createBoardInput);
  }

  @Query(() => PaginatedBoards)
  async boards(
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 6 })
    limit: number,
    @Args('cursor', { type: () => Int, nullable: true, defaultValue: 1 })
    cursor: Board['id'],
  ): Promise<PaginatedBoards> {
    return this.boardService.getBoards(limit, cursor);
  }

  @ResolveField(() => User)
  writer(@Root() parentBoard: Board): Promise<User> | undefined {
    return this.usersService.getUser(parentBoard.writerId);
  }

  @ResolveField(() => Int)
  async likes(
    @Root() board: Board,
    @Loader(BoardLikeLoader) boardLikeLoader: DataLoader<number, BoardLike[]>,
  ): Promise<number> {
    const result = await boardLikeLoader.load(board.id);

    return result.length;
  }

  @Query(() => Board, { nullable: true })
  async board(
    @Args('boardId', { type: () => Int }) boardId: number,
  ): Promise<Board | undefined> {
    return await this.boardService.getBoard(boardId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async like(
    @Args('boardId', { type: () => Int })
    boardId: number,
    @CurrentUser()
    userId: number,
  ): Promise<boolean> {
    return await this.boardService.vote(boardId, userId);
  }
}
