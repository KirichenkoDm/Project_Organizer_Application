import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { TokensDto } from "./dto/token.dto";

@Injectable()
export class SetRefreshTokenInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<TokensDto> {
    const contextHttp = context.switchToHttp();
    const response = contextHttp.getResponse();

    return next.handle().pipe(
      tap((data) => {
        // Якщо у відповіді є refreshToken, ставимо його в cookie
        if (data?.refreshToken) {
          response.cookie('refreshToken', data.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: 30 * 24 * 60 * 60 * 1000,
          });
          delete data.refreshToken;
        }
      }),
    );
  }
}
