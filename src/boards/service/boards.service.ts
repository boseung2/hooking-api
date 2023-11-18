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

    const [boards, total] = await this.boardRepository.findAndCount({
      order: {
        id: 'DESC',
      },
      skip: cursor - 1,
      take: realLimit,
    });

    const nextCursor = cursor + realLimit;
    const hasNext = cursor < total;

    return {
      cursor: hasNext ? nextCursor : null,
      boards,
    };
  }

  getBoard(boardId: number) {
    // return boardsData.find((board) => board.id === boardId);
    return {} as Board;
  }
}
