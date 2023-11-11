import { Module } from '@nestjs/common';
import { BoardResolver } from './resolver/board.resolver';

@Module({
  providers: [BoardResolver],
})
export class BoardModule {}
