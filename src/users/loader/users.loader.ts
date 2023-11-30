import { In, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NestDataLoader } from 'nestjs-dataloader';
import * as DataLoader from 'dataloader';

@Injectable()
export class UsersLoader implements NestDataLoader<number, User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getByUserId = () =>
    new DataLoader<number, User>(async (userIds: number[]) => {
      const users: User[] = await this.userRepository.find({
        where: { id: In(userIds) },
      });

      return userIds.map((userId) => users.find((user) => user.id === userId));
    });
}
