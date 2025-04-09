import { Body, Controller, Post, Req, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CredentialsDto } from "./dto/Credentials.dto";
import { TokensDto } from "./dto/token.dto";
import { SetRefreshTokenInterceptor } from "./refresh-token.interceptor";
import { Request } from "express";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @UseInterceptors(SetRefreshTokenInterceptor)
  async login(
    @Body() loginData: CredentialsDto,
  ): Promise<TokensDto> {
    const user = await this.authService.validateUser(loginData);

    const userTokens = await this.authService.login(user);

    return userTokens;
  }

  @Post('refresh')
  @UseInterceptors(SetRefreshTokenInterceptor)
  async refresh(
    @Req() req: Request,
  ): Promise<TokensDto> {
    const refreshToken = req.cookies['refreshToken'];
    return this.authService.refreshTokens(refreshToken);
  }
}