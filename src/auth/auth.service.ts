import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  createAccessToken(userId: number) {
    const userData = { userId };
    const accessToken = this.jwtService.sign(userData);

    return accessToken;
  }
}
