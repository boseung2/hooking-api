import {
  Args,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../entity/user.entity';
import { UsersService } from '../service/users.service';
import { IsEmail, IsString } from 'class-validator';
import * as argon2 from 'argon2';
import { AuthService } from '../../auth/auth.service';

@InputType({ description: '회원가입 인풋 데이터' })
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

@InputType({ description: '로그인 인풋 데이터' })
export class LoginInput {
  @Field()
  @IsString()
  emailOrUserId: string;

  @Field()
  @IsString()
  password: string;
}

@ObjectType({ description: '필드 에러 타입' })
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType({ description: '로그인 반환 데이터' })
class LoginResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;

  @Field({ nullable: true })
  accessToken?: string;
}

@Resolver(User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

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

  @Mutation(() => LoginResponse)
  public async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<LoginResponse> {
    const { emailOrUserId, password } = loginInput;

    const user = await User.findOne({
      where: [{ email: emailOrUserId }, { userId: emailOrUserId }],
    });
    if (!user) {
      return {
        errors: [
          { field: 'emailOrUserId', message: '해당하는 유저가 없습니다`' },
        ],
      };
    }

    const isValid = await argon2.verify(user.password, password);

    if (!isValid) {
      return {
        errors: [
          { field: 'password', message: '비밀번호를 올바르게 입력해주세요' },
        ],
      };
    }

    const accessToken = this.authService.createAccessToken(user.id);

    return { user, accessToken };
  }

  @Query(() => [User])
  Users(): User[] {
    return this.usersService.getUsers();
  }
}
