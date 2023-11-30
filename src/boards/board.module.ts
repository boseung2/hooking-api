import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { BoardsResolver } from './resolver/boards.resolver';
import { BoardsService } from './service/boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entity/board.entity';
import { AuthModule } from 'src/auth/auth.module';
import { BoardLike } from './entity/board-like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, BoardLike]),
    AuthModule,
    UsersModule,
  ],
  providers: [BoardsResolver, BoardsService],
})
export class BoardsModule {}
