import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';

@Injectable()
export class UsersService {
  async getUser(id: number) {
    const user = await User.findOne({
      where: [{ id }],
    });

    if (!user) {
      return undefined;
    }

    return user as User;
  }

  getUsers() {
    return [];
  }
}
