import { GetUserDto, GetUserWithPasswordDto } from "./dto/get-user.dto";
import { UserEntity } from "./user.entity";

export class UserCore {
  mapperEntityToGetDto(user: UserEntity): GetUserDto {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    } as GetUserDto;
  }

  mapperEntityToGetWithPasswordDto(user: UserEntity): GetUserWithPasswordDto {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
    } as GetUserWithPasswordDto;
  }
}