import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { BasicResponseDto } from "src/shared/dto/basic-response.dto";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { RoleRepository } from "./role.repository";
import { RoleNamesEnum } from "src/shared/role-names.enum";

@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
  ){ }

  async getRole(userId: number, projectId: number): Promise<RoleNamesEnum> {
    const role = await this.roleRepository.findRole(userId, projectId);

    if(!role) {
      throw new NotFoundException("Role was not found");
    }

    return role
  }

  async createRole(roleData: CreateRoleDto): Promise<BasicResponseDto> {
    const role = await this.roleRepository.save(roleData);

    if(!role) {
      throw new BadRequestException("Role was not created");
    }

    return {
      message: "Role successsfully created",
      status: 200,
      isSuccess: true,
    };
  }

  async updateRoleById(id: number, roleData: UpdateRoleDto): Promise<BasicResponseDto> {
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
        status: 200,
        isSuccess: true,
      };
    }

    async deleteRoleById(id: number): Promise<BasicResponseDto> {
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
        status: 204,
        isSuccess: true,
      }
    }
}
