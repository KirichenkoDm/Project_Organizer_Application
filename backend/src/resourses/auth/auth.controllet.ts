import { Body, Controller, Post, Req, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CredentialDto } from "./dto/credential.dto";
import { TokensDto } from "./dto/token.dto";
import { SetRefreshTokenInterceptor } from "./refresh-token.interceptor";
import { Request } from "express";
import { Public } from "src/shared/public.decorator";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @Public()
  @UseInterceptors(SetRefreshTokenInterceptor)
  async login(
    @Body() loginData: CredentialDto,
  ): Promise<TokensDto> {
    const user = await this.authService.validateUser(loginData);

    const userTokens = await this.authService.login(user);

    return userTokens;
  }

  @Post('refresh')
  @Public()
  @UseInterceptors(SetRefreshTokenInterceptor)
  async refresh(
    @Req() req: Request,
  ): Promise<TokensDto> {
    const refreshToken = req.cookies['refreshToken'];
    return this.authService.refreshTokens(refreshToken);
  }
}