import { Query, Resolver, Root, ResolveField } from '@nestjs/graphql';
import { Board } from '../entity/board.entity';
import User from 'src/users/entity/user.entity';
import { BoardsService } from '../service/boards.service';
import { UsersService } from '../../users/service/users.service';

@Resolver(Board)
export class BoardsResolver {
  constructor(
    private boardService: BoardsService,
    private usersService: UsersService,
  ) {}

  @Query(() => [Board])
  boards(): Board[] {
    return this.boardService.getBoards();
  }

  @ResolveField(() => User)
  writer(@Root() parentBoard: Board): User | undefined {
    return this.usersService.getUser(parentBoard.id);
  }
}
