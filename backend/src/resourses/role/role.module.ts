import { Module } from "@nestjs/common";
import { RoleService } from "./role.service";
import { RoleController } from "./role.controller";
import { RoleRepository } from "./role.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleEntity } from "./role.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity]),
  ],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
  exports: [RoleService, RoleRepository],
})
export class RoleModule { }
