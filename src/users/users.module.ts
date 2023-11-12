import { Module } from '@nestjs/common';
import { UsersResolver } from './resolver/users.resolver';
import { UsersService } from './service/users.service';

@Module({
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
