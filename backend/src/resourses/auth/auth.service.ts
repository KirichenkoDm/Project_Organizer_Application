import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { CredentialDto } from "./dto/credential.dto";
import * as bcrypt from 'bcrypt';
import { GetUserDto } from "../user/dto/get-user.dto";
import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "../user";
import { TokensDto } from "./dto/token.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(loginData: CredentialDto): Promise<GetUserDto> {
    const user = await this.userRepository.findByEmailWithPassword(loginData.email);

    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException("The password is wrong.");
    }

    return user;
  }

  async login(user: GetUserDto): Promise<TokensDto> {
    const tokens = await this.generateTokens(user);

    await this.userRepository.setRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async generateTokens(user: GetUserDto): Promise<TokensDto> {
    const payload = {
      sub: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '1h',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '30d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(refreshToken: string): Promise<TokensDto> {
    const payload = this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
    if (!payload.sub) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.userRepository.findById(payload.sub);
    const tokens = await this.generateTokens(user);

    await this.userRepository.setRefreshToken(payload.sub, tokens.refreshToken);

    return tokens;
  }
}