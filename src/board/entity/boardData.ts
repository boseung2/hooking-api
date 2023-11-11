import { Board } from './board.entity';

export const BoardData: Board[] = [
  {
    id: 1,
    type: 'review',
    content: '첫 번째 게시글',
    writerId: 1,
    views: 5,
    likes: 10,
    createDate: '20231112',
    modifiedDate: '20231112',
  },
  {
    id: 2,
    type: 'review',
    content: '두 번째 리뷰 입니다...... brbrbrbrbr...',
    writerId: 1,
    views: 10,
    likes: 30,
    createDate: '20231114',
    modifiedDate: '20231114',
  },
];
