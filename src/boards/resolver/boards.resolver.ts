import {
  Query,
  Resolver,
  Root,
  ResolveField,
  Int,
  Args,
  Mutation,
  Context,
} from '@nestjs/graphql';
import { Board, PaginatedBoards } from '../entity/board.entity';
import { User } from 'src/users/entity/user.entity';
import { BoardsService } from '../service/boards.service';
import { CreateBoardInput } from '../input/create-board.input';
import { GqlAuthGuard } from 'src/auth/guard/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { BoardLikeLoader } from '../loader/board-like.loader';
import * as DataLoader from 'dataloader';
import { Loader } from 'nestjs-dataloader';
import { BoardLike } from '../entity/board-like.entity';
import { UsersLoader } from 'src/users/loader/users.loader';
import { AuthService } from 'src/auth/service/auth.service';
import { UpdateBoardInput } from '../input/update-board.input';

@Resolver(Board)
export class BoardsResolver {
  constructor(
    private boardService: BoardsService,
    private authService: AuthService,
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
  async writer(
    @Root() board: Board,
    @Loader(UsersLoader) usersLoader: DataLoader<number, User[]>,
  ): Promise<User> | undefined {
    const users = await usersLoader.load(board.writerId);

    const user = users.find((user) => user.id === board.writerId);

    return user;
  }

  @ResolveField(() => Int)
  async likes(
    @Root() board: Board,
    @Loader(BoardLikeLoader) boardLikeLoader: DataLoader<number, BoardLike[]>,
  ): Promise<number> {
    const boardLikes = await boardLikeLoader.load(board.id);

    return boardLikes.length;
  }

  @ResolveField(() => Boolean)
  async isLike(
    @Root() board: Board,
    @Context() context,
    @Loader(BoardLikeLoader) boardLikeLoader: DataLoader<number, BoardLike[]>,
  ): Promise<boolean> {
    // TODO: CurrentUserDecorator 사용 안되는 이유 알아내야함
    const { authorization } = context.req.headers;
    const accessToken = authorization.split(' ')[1];
    const verified = this.authService.verifyAccessToken(accessToken);

    if (!verified) return false;

    const userId = verified.userId;
    const isLikes = await boardLikeLoader.load(board.id);
    const isLike = isLikes.find((like) => like.userId === userId);

    if (!isLike) return false;

    return true;
  }

  @Query(() => Board, { nullable: true })
  async board(
    @Args('boardId', { type: () => Int }) boardId: number,
  ): Promise<Board | undefined> {
    return await this.boardService.getBoard(boardId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async likeBoard(
    @Args('boardId', { type: () => Int })
    boardId: number,
    @CurrentUser()
    userId: number,
  ): Promise<boolean> {
    return await this.boardService.vote(boardId, userId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Board)
  async updateBoard(
    @Args('updateBoardInput') updateBoardInput: UpdateBoardInput,
  ): Promise<Board | undefined> {
    return this.boardService.updateBoard(updateBoardInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteBoard(
    @Args('boardId', { type: () => Int })
    boardId: number,
  ): Promise<boolean> {
    return await this.boardService.deleteBoard(boardId);
  }
}
