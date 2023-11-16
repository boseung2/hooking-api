import { Module } from '@nestjs/common';
import { UsersResolver } from './resolver/users.resolver';
import { UsersService } from './service/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CacheDBModule } from 'src/cache/cache.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule, CacheDBModule],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
