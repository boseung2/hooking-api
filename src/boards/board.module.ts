import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { BoardsResolver } from './resolver/boards.resolver';
import { BoardsService } from './service/boards.service';

@Module({
  imports: [UsersModule],
  providers: [BoardsResolver, BoardsService],
})
export class BoardsModule {}
