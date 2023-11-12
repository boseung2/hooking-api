import { Injectable } from '@nestjs/common';
import { BoardsData } from '../entity/boardsData';

@Injectable()
export class BoardsService {
  getBoards() {
    return BoardsData;
  }
}
