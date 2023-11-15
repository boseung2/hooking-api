import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { SignUpInput } from '../input/sign-up.input';
import * as argon2 from 'argon2';
import { LoginInput } from '../input/login.input';
import { AuthService } from '../../auth/service/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  async getUser(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: Equal(id) },
    });

    console.log(user);

    if (!user) {
      return undefined;
    }

    return user as User;
  }

  async createUser(user: SignUpInput) {
    const { email, username, userId, password } = user;

    const hashedPw = await argon2.hash(password);
    const newUser = this.userRepository.create({
      email,
      username,
      userId,
      password: hashedPw,
    });

    await User.insert(newUser);

    return newUser;
  }

  async login(loginInput: LoginInput) {
    const { emailOrUserId, password } = loginInput;

    const user = await this.userRepository.findOne({
      where: [{ email: emailOrUserId }, { userId: emailOrUserId }],
    });
    if (!user) {
      return {
        errors: [
          { field: 'emailOrUserId', message: '해당하는 유저가 없습니다' },
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

  getUsers() {
    return [];
  }
}
