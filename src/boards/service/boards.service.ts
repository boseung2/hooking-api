import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../entity/board.entity';
import { Repository } from 'typeorm';
import { CreateBoardInput } from '../input/create-board.input';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async createBoard(userId: number, boardData: CreateBoardInput) {
    const { type, content } = boardData;

    const newBoard = await this.boardRepository.create({
      type,
      content,
      writerId: userId,
      views: 0,
      likes: 0,
      reviews: 0,
    });

    await this.boardRepository.insert(newBoard);

    return newBoard;
  }

  async getBoards(limit: number, cursor: number) {
    const realLimit = Math.min(6, limit);

    if (!cursor) return { boards: [] };

    // const cursorDataIndex = boardsData.findIndex(
    //   (board) => board.id === cursor,
    // );

    // if (cursorDataIndex === -1) return { boards: [] };

    // const result = boardsData.slice(
    //   cursorDataIndex,
    //   cursorDataIndex + realLimit,
    // );

    // const nextCursor = result[result.length - 1].id + 1;

    // const hasNext =
    //   boardsData.findIndex((board) => board.id === nextCursor) > -1;

    // return {
    //   cursor: hasNext ? nextCursor : null,
    //   boards: result,
    // };
    return {};
  }

  getBoard(boardId: number) {
    // return boardsData.find((board) => board.id === boardId);
    return {} as Board;
  }
}
