import { Board } from './board.entity';

export const boardsData: Board[] = [
  {
    id: 1,
    type: 'review',
    content: '첫 번째 게시글',
    writerId: 1,
    views: 5,
    likes: 10,
    createDate: new Date('2023/11/9'),
    modifiedDate: new Date(),
  },
  {
    id: 2,
    type: 'review',
    content: '두 번째 리뷰 입니다...... brbrbrbrbr...',
    writerId: 2,
    views: 10,
    likes: 30,
    createDate: new Date('2023/11/11'),
    modifiedDate: new Date(),
  },
  {
    id: 3,
    type: 'review',
    content: '세 번째 리뷰 입니다...... brbrbrbrbr...',
    writerId: 1,
    views: 10,
    likes: 30,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    id: 4,
    type: 'review',
    content: `여러분은 언제 가장 큰 행복을 느끼나요?

    맛있는 걸 먹을 때, 좋아하는 운동을 할 때, 사랑에 빠질 때?
    
    여러 가지 행복의 기준이 있을 수 있어요.
    
    안되고 답답한 일이 생겼을 때 그것을 극복해 낸 경험이 있나요?
    
    안 풀릴 때는 너무나도 답답하고 미칠 것 같지만 어느 순간 해결되면 '와 해냈다'라는 마음과 함께 큰 만족감이 일어나요.
    
    맛있는 음식을 먹을 때 느끼는 만족감과는 다르게 "성장"했다는 느낌을 받으며 말이죠.
    
    ​
    저의 경우도 가장 큰 행복을 느낄 때는 '어제 하지 못하던 것을 오늘 할 수 있게 됐을 때'예요.​
    
    어제 하지 못하던 일을 오늘 할 수 있게 만들려면 어떻게 해야 할까요?
    
    가만히 앉아서 책 또는 설명서를 보며 해답을 찾는 것도 방법이 될 수 있어요. 책은 내가 가진 문제를 넓은 시야에서 볼 수 있게 도와주죠.
    
    하지만 책만 읽고 아무것도 하지 않는다면 어제 하지 못하던 일을 오늘 할 수 있게 될까요?​
    
    아니요 아무 일도 일어나지 않아요. 그저 종이를 넘기고 조금 더 똑똑해졌다는 느낌을 받을 뿐이죠.
    
    그렇기에 무엇보다 중요한건 "실행"이라고 생각해요.​
    
    ​
    
    책을 읽지 않는 사람들은, '그거 읽고 인생이 바뀌냐? 난 그냥 인생 즐길래' 라고 말하곤 해요.
    
    이 글을 보고 있는 여러분은 최소한 책을 읽으려는 마음이 있고 조금 더 성장하고 싶은 사람일 거예요.​
    
    그런 마음에서 책을 읽었는데 아무것도 변하지 않는다면 책 읽지 않는 사람들보다 나은 게 있을까요?
    
    그저 '상식이 늘어났네 유식한 티 좀 낼 수 있겠어' '나는 책 읽는 사람이야' 정도로 만족만 할 건가요?
    ​
    
    이런 점을 잘 알기에, 후킹 커뮤니티에서는 이 2가지를 핵심 가치로 뽑아서 운영하려고 해요.
    
    첫 번째는 "성장"이예요.
    
    책을 통해 세상을 보는 시야를 넓히고 지식을 쌓으며 성장해요.
    
    두 번째는 '실행'이예요.
    
    실행한 '나만의 작고 소중한 경험'을 공유하고 다시 실행해요.
    
    후킹 커뮤니티는 독서 모임으로 시작하지만, 점차 성장을 원하는 사람들이 모여서 경험을 공유하고 또다시 공유한 경험을 바탕으로 성장을 이루는 구조를 만들려고 해요.
    
    독서뿐만 아니라, 리더가 되어서 모임을 주도해 보기도 하고 누구라도 내가 경험한 지식을 미니 세미나를 통해서 공유할 수 있는 환경을 만들고 싶어요.
    
    (대단한 경험이 아니어도 괜찮아요. 대단한 성취도 작은 실행 속에서 완성되니깐요.)
    
    ​
    
    어떤가요? "성장" "실행"이라는 두 가지 핵심 키워드를 가지고 함께 성장하는 커뮤니티, 정말 재밌을 것 같지 않나요?
    
    "성장"과 "실행"에 진심인 분이라면 후킹 커뮤니티를 통해 전과는 달라진 나를 느껴보세요!
    
    가입신청은 프로필에 링크를 클릭해주세요!`,
    writerId: 1,
    views: 10,
    likes: 30,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    id: 5,
    type: 'review',
    content: '5 리뷰 입니다...... brbrbrbrbr...',
    writerId: 2,
    views: 10,
    likes: 30,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    id: 6,
    type: 'review',
    content: '6 리뷰 입니다...... brbrbrbrbr...',
    writerId: 2,
    views: 10,
    likes: 30,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    id: 7,
    type: 'review',
    content: '7 리뷰 입니다...... brbrbrbrbr...',
    writerId: 1,
    views: 10,
    likes: 30,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    id: 8,
    type: 'review',
    content: '8 리뷰 입니다...... brbrbrbrbr...',
    writerId: 1,
    views: 10,
    likes: 30,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    id: 9,
    type: 'review',
    content: '9 리뷰 입니다...... brbrbrbrbr...',
    writerId: 1,
    views: 10,
    likes: 30,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    id: 10,
    type: 'review',
    content: '10 리뷰 입니다...... brbrbrbrbr...',
    writerId: 1,
    views: 10,
    likes: 30,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    id: 11,
    type: 'review',
    content: '11 리뷰 입니다...... brbrbrbrbr...',
    writerId: 1,
    views: 10,
    likes: 30,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    id: 12,
    type: 'review',
    content: '12리뷰 입니다...... brbrbrbrbr...',
    writerId: 1,
    views: 10,
    likes: 30,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    id: 13,
    type: 'review',
    content: '13 리뷰 입니다...... brbrbrbrbr...',
    writerId: 1,
    views: 10,
    likes: 30,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    id: 14,
    type: 'review',
    content: '14 리뷰 입니다...... brbrbrbrbr...',
    writerId: 1,
    views: 10,
    likes: 30,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    id: 15,
    type: 'review',
    content: '15 리뷰 입니다...... brbrbrbrbr...',
    writerId: 2,
    views: 10,
    likes: 30,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    id: 16,
    type: 'review',
    content: '16 리뷰 입니다...... brbrbrbrbr...',
    writerId: 2,
    views: 10,
    likes: 30,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
];
