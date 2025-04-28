import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { BasicResponceDto } from "src/shared/dto/basic-responce.dto";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { RoleRepository } from "./role.repository";

@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
  ){ }

  async createRole(roleData: CreateRoleDto): Promise<BasicResponceDto> {
    const role = await this.roleRepository.save(roleData);

    if(!role) {
      throw new BadRequestException("Role was not created");
    }

    return {
      message: "Role successsfully created",
      isSuccess: true,
    };
  }

  async updateRoleById(id: number, roleData: UpdateRoleDto): Promise<BasicResponceDto> {
      const roleToUpdate = await this.roleRepository.findOneBy({ id });
      if (!roleToUpdate) {
        throw new NotFoundException("Role with this id not found");
      }
  
      const role = await this.roleRepository.save({
        ...roleToUpdate,
        ...roleData,
      });
  
      if(!role) {
        throw new BadRequestException("Role was not updated");
      }
  
      return {
        message: "Role successsfully updated",
        isSuccess: true,
      };
    }

    async deleteRoleById(id: number): Promise<BasicResponceDto> {
      const roleToDelete = await this.roleRepository.findOneBy({ id });
  
      if (!roleToDelete) {
        throw new NotFoundException("Role with this id not found");
      }
      
      const result = await this.roleRepository.softDelete(id);
  
      if (result.affected === 0) {
        throw new BadRequestException("Role was not deleted");
      }
  
      return {
        message: "Role successsfully deleted",
        isSuccess: true,
      }
    }
}
