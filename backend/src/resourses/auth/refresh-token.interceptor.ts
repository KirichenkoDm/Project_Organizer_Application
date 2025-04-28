import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { TokensDto } from "./dto/token.dto";

const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000

@Injectable()
export class SetRefreshTokenInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<TokensDto> {
    const contextHttp = context.switchToHttp();
    const response = contextHttp.getResponse();

    return next.handle().pipe(
      tap((data) => {
        if (data?.refreshToken) {
          response.cookie('refreshToken', data.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: THIRTY_DAYS,
          });
          delete data.refreshToken;
        }
      }),
    );
  }
}
