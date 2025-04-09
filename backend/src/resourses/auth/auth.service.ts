import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { CredentialDto } from "./dto/credential.dto";
import * as bcrypt from 'bcrypt';
import { GetUserDto } from "../user/dto/get-user.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginData: CredentialDto): Promise<GetUserDto> {
    const user = await this.userService.getUserWithPasswordByEmail(loginData.email);
    
    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException("The password is wrong.");
    }
    
    return user;
  }

  async login(user: GetUserDto) {
    const payload = {
      sub: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    };
    return this.jwtService.sign(payload);
  }
}