import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CredentialDto } from "./dto/credential.dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  async login(
    @Body() loginData: CredentialDto,
  ): Promise<string> {
    const user = await this.authService.validateUser(loginData);

    const userToken = await this.authService.login(user);

    return userToken
  }
}