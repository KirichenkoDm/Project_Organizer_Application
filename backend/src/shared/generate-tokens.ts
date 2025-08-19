import { TokensDto } from "src/shared/dto/token.dto";
import { GetUserDto } from "src/resourses/user/dto/get-user.dto";
import { JwtService } from "@nestjs/jwt";

const jwtService = new JwtService()

export async function generateTokens(user: GetUserDto): Promise<TokensDto> {
  const payload = {
    sub: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    isAdmin: user.isAdmin || false
  };

  const accessToken = jwtService.sign(payload, {
    secret: process.env.JWT_ACCESS_SECRET,
    expiresIn: '1h',
  });

  const refreshToken = jwtService.sign(payload, {
    secret: process.env.JWT_REFRESH_SECRET,
    expiresIn: '30d',
  });

  return {
    accessToken,
    refreshToken,
  };
}