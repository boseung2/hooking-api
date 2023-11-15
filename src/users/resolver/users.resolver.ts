import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../entity/user.entity';
import { UsersService } from '../service/users.service';
import { SignUpInput } from '../input/sign-up.input';
import { LoginInput, LoginResponse } from '../input/login.input';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guard/gql-auth.guard';

@Resolver(User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(() => User)
  async signUp(@Args('signUpInput') signUpInput: SignUpInput): Promise<User> {
    return this.usersService.createUser(signUpInput);
  }

  @Mutation(() => LoginResponse)
  public async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<LoginResponse> {
    return this.usersService.login(loginInput);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { nullable: true })
  async me(@CurrentUser() userId: number): Promise<User> {
    console.log('======' + userId);
    return this.usersService.getUser(userId);
  }

  @Query(() => [User])
  Users(): User[] {
    return this.usersService.getUsers();
  }
}
