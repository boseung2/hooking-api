import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../entity/user.entity';
import { UsersService } from '../service/users.service';
import { SignUpInput } from '../input/sign-up.input';
import {
  LoginInput,
  LoginResponse,
  RefreshAccessTokenResponse,
} from '../input/login.input';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { Res, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guard/gql-auth.guard';
import { Response } from 'express';

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
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginResponse> {
    console.log('LOGIN!!!');
    return this.usersService.login(loginInput, response.req.res);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { nullable: true })
  async me(@CurrentUser() userId: number): Promise<User> {
    return this.usersService.getUser(userId);
  }

  @Mutation(() => RefreshAccessTokenResponse, { nullable: true })
  async refreshAccessToken(@Res({ passthrough: true }) response: Response) {
    return this.usersService.refreshAccessToken(response);
  }

  @Query(() => [User])
  Users(): User[] {
    return this.usersService.getUsers();
  }
}
