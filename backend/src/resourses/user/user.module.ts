import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserEntity } from "./user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { RoleModule } from "../role/role.module";
import { RoleRepository } from "../role/role.repository";
import { UserCore } from "./user.core";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    RoleModule
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, RoleRepository, UserCore],
  exports: [UserRepository],
})
export class UserModule {}
