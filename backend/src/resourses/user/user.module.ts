import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserEntity } from "./user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { RoleModule, RoleRepository } from "../role";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    RoleModule
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, RoleRepository],
  exports: [UserRepository],
})
export class UserModule {}
