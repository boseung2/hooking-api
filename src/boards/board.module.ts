import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { BoardsResolver } from './resolver/boards.resolver';
import { BoardsService } from './service/boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entity/board.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), AuthModule, UsersModule],
  providers: [BoardsResolver, BoardsService],
})
export class BoardsModule {}
