import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { SignUpInput } from '../input/sign-up.input';
import * as argon2 from 'argon2';
import { LoginInput } from '../input/login.input';
import { AuthService } from '../../auth/service/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Response } from 'express';
import { CacheDBService } from 'src/cache/cache.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authService: AuthService,
    private cacheDBService: CacheDBService,
  ) {}

  async getUser(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: Equal(id) },
    });

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

  async login(loginInput: LoginInput, response: Response) {
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

    // 엑세스 토큰 발급
    const accessToken = this.authService.createAccessToken(user.id);
    const refreshToken = this.authService.createRefreshToken(user.id);

    // 리프레시 토큰 레디스 적재
    await this.cacheDBService.set(String(user.id), refreshToken);

    // 쿠키로 리프레시 토큰 전송
    this.setRefreshTokenHeader(response, refreshToken);

    return { user, accessToken };
  }

  private setRefreshTokenHeader(response: Response, refreshToken: string) {
    response.cookie('refreshtoken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
  }

  async refreshAccessToken(response: Response) {
    const refreshToken = response.req.cookies.refreshtoken;
    if (!refreshToken) return null;

    const { userId } = this.authService.verifyAccessToken(refreshToken);
    if (!userId) return null;

    const storedRefreshToken = await this.cacheDBService.get(String(userId));
    if (!storedRefreshToken) return null;
    if (!(storedRefreshToken === refreshToken)) return null;

    const user = await this.getUser(userId);
    if (!user) return null;

    const newAccessToken = this.authService.createAccessToken(user.id);
    const newRefreshToken = this.authService.createRefreshToken(user.id);

    await this.cacheDBService.set(String(user.id), newRefreshToken);

    this.setRefreshTokenHeader(response.req.res, newRefreshToken);

    return {
      accessToken: newAccessToken,
    };
  }

  getUsers() {
    return [];
  }
}
