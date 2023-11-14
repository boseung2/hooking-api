import {
  Args,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../entity/user.entity';
import { UsersService } from '../service/users.service';
import { IsEmail, IsString } from 'class-validator';
import * as argon2 from 'argon2';

@InputType()
export class SignUpInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  username: string;

  @Field()
  @IsString()
  userId: string;

  @Field()
  @IsString()
  password: string;
}

@Resolver(User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(() => User)
  async signUp(@Args('signUpInput') signUpInput: SignUpInput): Promise<User> {
    const { email, username, userId, password } = signUpInput;

    const hashedPw = await argon2.hash(password);
    const newUser = User.create({
      email,
      username,
      userId,
      password: hashedPw,
    });

    await User.insert(newUser);

    return newUser;
  }

  @Query(() => [User])
  Users(): User[] {
    return this.usersService.getUsers();
  }
}
