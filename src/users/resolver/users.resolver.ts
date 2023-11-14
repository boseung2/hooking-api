import { Query, Resolver } from '@nestjs/graphql';
import { User } from '../entity/user.entity';
import { UsersService } from '../service/users.service';

@Resolver(User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  Users(): User[] {
    return this.usersService.getUsers();
  }
}
