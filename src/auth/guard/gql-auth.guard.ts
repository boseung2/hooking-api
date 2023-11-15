import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from '../service/auth.service';
import { AuthenticationError } from '@nestjs/apollo';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const gqlContext = GqlExecutionContext.create(context).getContext();

    const { authorization } = gqlContext.req.headers;

    // Authorization header가 존재하지 않으면 가드 통과 X
    if (!authorization) {
      throw new AuthenticationError('unauthenticated');
    }

    const accessToken = authorization.split(' ')[1];
    const { userId } = this.authService.verifyAccessToken(accessToken);

    // req 객체에 userId 넣는다.
    gqlContext.req.userId = userId;

    return !!userId;
  }
}
