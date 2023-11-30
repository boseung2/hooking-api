import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { BoardLike } from '../entity/board-like.entity';
import { BoardsService } from '../service/boards.service';

@Injectable()
export class BoardLikeLoader implements NestDataLoader<number, BoardLike[]> {
  constructor(private boardsService: BoardsService) {}

  generateDataLoader(): DataLoader<number, BoardLike[]> {
    return new DataLoader<number, BoardLike[]>(async (boardIds: number[]) => {
      const boardLikes: BoardLike[] = await this.boardsService.getBoardLikes(
        boardIds,
      );

      const result = boardIds.map((boardId) =>
        boardLikes.filter((boardLike) => boardLike.boardId === boardId),
      );

      return result;
    });
  }
}
