import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CredentialDto } from "./dto/credential.dto";
import * as bcrypt from 'bcrypt';
import { GetUserDto } from "../user/dto/get-user.dto";
import { JwtService } from "@nestjs/jwt";
import { TokensDto } from "../../shared/dto/token.dto";
import { UserRepository } from "../user/user.repository";
import { generateTokens } from "src/shared/generate-tokens";

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(loginData: CredentialDto): Promise<GetUserDto> {
    const user = await this.userRepository.findByEmailWithPassword(loginData.email);

    if (!user) {
      throw new NotFoundException("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException("Invalid credentials");
    }

    return user;
  }

  async login(user: GetUserDto): Promise<TokensDto> {
    const tokens = await generateTokens(user);

    await this.userRepository.setRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(id: number): Promise<TokensDto> {
    const refreshToken = (await this.userRepository.findOneBy({id})).refreshToken;
    return {accessToken: "", refreshToken};
  }

  async refreshTokens(refreshToken: string): Promise<TokensDto> {
    const payload = this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
    if (!payload.sub) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    
    const user = await this.userRepository.findById(payload.sub);

    const tokens = await generateTokens(user);

    await this.userRepository.setRefreshToken(payload.sub, tokens.refreshToken);
    return tokens;
  }
}