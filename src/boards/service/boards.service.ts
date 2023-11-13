import { Injectable } from '@nestjs/common';
import { boardsData } from '../entity/boardsData';

@Injectable()
export class BoardsService {
  getBoards(limit: number, cursor: number) {
    const realLimit = Math.min(6, limit);

    if (!cursor) return { boards: [] };

    const cursorDataIndex = boardsData.findIndex(
      (board) => board.id === cursor,
    );

    if (cursorDataIndex === -1) return { boards: [] };

    const result = boardsData.slice(
      cursorDataIndex,
      cursorDataIndex + realLimit,
    );

    const nextCursor = result[result.length - 1].id + 1;

    const hasNext =
      boardsData.findIndex((board) => board.id === nextCursor) > -1;

    return {
      cursor: hasNext ? nextCursor : null,
      boards: result,
    };
  }
}
