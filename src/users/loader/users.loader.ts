import { User } from '../entity/user.entity';
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { UsersService } from '../service/users.service';

@Injectable()
export class UsersLoader implements NestDataLoader<number, User[]> {
  constructor(private userService: UsersService) {}

  generateDataLoader(): DataLoader<number, User[]> {
    return new DataLoader<number, User[]>(async (ids: number[]) => {
      const users: User[] = await this.userService.getUsers(ids);

      const result = ids.map((id) => users.filter((user) => user.id === id));

      return result;
    });
  }
}
