import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './service/auth.service';

const JWT_SECRET_KEY = 'secret-key';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || JWT_SECRET_KEY,
      signOptions: { expiresIn: '10m' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
