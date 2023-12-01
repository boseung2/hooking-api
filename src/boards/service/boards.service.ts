import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../entity/board.entity';
import { In, Repository } from 'typeorm';
import { CreateBoardInput } from '../input/create-board.input';
import { BoardLike } from '../entity/board-like.entity';
import { UpdateBoardInput } from '../input/update-board.input';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,

    @InjectRepository(BoardLike)
    private boardLikeRepository: Repository<BoardLike>,
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
      where: { isDeleted: false },
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

  async getBoard(id: number) {
    const board = await this.boardRepository.findOne({ where: { id } });

    this.boardRepository.update(board.id, { ...board, views: board.views + 1 });

    return board;
  }

  async vote(boardId: number, userId: number) {
    if (!userId) return false;
    if (!boardId) return false;

    const alreadyVoted = await this.boardLikeRepository.findOne({
      where: {
        boardId,
        userId,
      },
    });

    if (alreadyVoted) {
      await this.boardLikeRepository.delete({ boardId, userId });

      return true;
    }

    const like = await this.boardLikeRepository.create({ boardId, userId });
    await this.boardLikeRepository.insert(like);

    return true;
  }

  async countLikes(board: Board) {
    const count = await this.boardLikeRepository.count({
      where: { boardId: board.id },
    });

    return count;
  }

  async getBoardLikes(boardIds: number[]) {
    const boardLikes: BoardLike[] = await this.boardLikeRepository.find({
      where: { boardId: In(boardIds) },
    });

    return boardLikes;
  }

  async updateBoard(boardData: UpdateBoardInput) {
    const existingBoard = await this.boardRepository.findOne({
      where: { id: boardData.id },
    });

    if (!existingBoard) return undefined;

    const updatedBoard = this.boardRepository.create({
      ...existingBoard,
      content: boardData.content,
      type: boardData.type,
    });

    const result = await this.boardRepository.save(updatedBoard);

    return result;
  }

  async deleteBoard(id: number) {
    const existingBoard = await this.boardRepository.findOne({
      where: { id },
    });

    if (!existingBoard) return undefined;

    const deletedBoard = this.boardRepository.create({
      ...existingBoard,
      isDeleted: true,
    });

    const result = await this.boardRepository.save(deletedBoard);

    return !!result;
  }
}
