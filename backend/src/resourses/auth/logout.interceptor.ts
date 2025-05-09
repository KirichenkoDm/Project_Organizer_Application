import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { TokensDto } from "src/shared/dto/token.dto";

@Injectable()
export class SetLogOutInterceptor implements NestInterceptor {
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
            maxAge: -1,
          });
          delete data.refreshToken;
        }
      }),
    );
  }
}
