import { Body, Controller, Post, Req, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CredentialDto } from "./dto/credential.dto";
import { TokensDto } from "../../shared/dto/token.dto";
import { SetRefreshTokenInterceptor } from "../../shared/refresh-token.interceptor";
import { Request } from "express";
import { Public } from "src/shared/public.decorator";
import { SkipRoles } from "src/shared/roles.decorator";
import { SetLogOutInterceptor } from "./logout.interceptor";

@Controller('auth')
@SkipRoles()
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

  @Post("logout")
  @UseInterceptors(SetLogOutInterceptor)
  async logout (): Promise<TokensDto> {
    return {accessToken: "", refreshToken: ""}
  }
}