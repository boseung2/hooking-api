import { Injectable } from '@nestjs/common';
import { UsersData } from '../entity/usersData';

@Injectable()
export class UsersService {
  getUser(id: number) {
    const user = UsersData.find((user) => user.id === id);

    if (!user) {
      return undefined;
    }

    return user;
  }

  getUsers() {
    return UsersData;
  }
}
