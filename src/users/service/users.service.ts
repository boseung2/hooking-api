import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';

@Injectable()
export class UsersService {
  getUser(id: number) {
    const user = {};

    if (!user) {
      return undefined;
    }

    return user as User;
  }

  getUsers() {
    return [];
  }
}
