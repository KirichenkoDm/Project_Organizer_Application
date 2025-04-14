import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ProjectRepository } from "./project.repository";
import { GetProjectDto } from "./dto/get-project.dto";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { ProjectEntity } from "./projects.entity";
import { BasicResponceDto } from "src/shared/dto/basic-responce.dto";
import { RoleRepository } from "../role/role.repository";
import { RoleService } from "../role/role.service";
import { ColumnService } from "../column/column.service";
import { RoleNamesEnum } from "src/shared/role-names.enum";

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly roleRepository: RoleRepository,
    private readonly roleService: RoleService,
    private readonly columnService: ColumnService,
  ) { }

  async getProjectById(id: number): Promise<GetProjectDto> {
    const project = await this.projectRepository.findOneBy({ id });

    if(!project) {
      throw new NotFoundException("Project with this id not found");
    }

    return {
      id: project.id,
      name: project.name,
      theme: project.theme,
      description: project.description
    } as GetProjectDto;
  }

  async getProjectsByUserId(userId: number): Promise<GetProjectDto[]> {
    const projects = await this.roleRepository.findProjectsByUserId(userId);

    if(!projects || projects.length === 0) {
      throw new NotFoundException("No projects found for this user");
    }

    return projects.map(proj => this.entityToGetDto(proj))
  }

  async getProjectReportById(id: number): Promise<object> {
    const report = this.projectRepository.findReportById(id);

    if(!report) {
      throw new NotFoundException("Project report with this id not found");
    }

    return report;
  }

  async createProject(projectData: CreateProjectDto): Promise<GetProjectDto> {
    const project = await this.projectRepository.save(projectData);

    if (!project) {
      throw new BadRequestException("Project was not created");
    }

    const roleData = {
      userId: projectData.creatorId,
      projectId: project.id,
      role: RoleNamesEnum.Owner
    }
    
    await this.roleService.createRole(roleData)
    await this.columnService.createDefaultColumns(project.id);

    return this.entityToGetDto(project);
  }

  async updateProjectById(id: number, projectData: UpdateProjectDto): Promise<GetProjectDto> {
    const projectToUpdate = await this.projectRepository.findOneBy({ id });
    if (!projectToUpdate) {
      throw new NotFoundException("Project with this id not found");
    }

    const project = await this.projectRepository.save({
      ...projectToUpdate,
      ...projectData,
    });

    if(!project) {
      throw new BadRequestException("Project was not updated");
    }

    return this.entityToGetDto(project);
  }

  async deleteProjectById(id: number): Promise<BasicResponceDto> {
    const projectToDelete = await this.projectRepository.findOneBy({ id });

    if (!projectToDelete) {
      throw new NotFoundException("Project with this id not found");
    }
    
    const result = await this.projectRepository.softDelete(id);

    if (result.affected === 0) {
      throw new BadRequestException("Project was not deleted");
    }

    return {message: "Project successsfully deleted"}
  }

  entityToGetDto(project: ProjectEntity): GetProjectDto {
    return {
      id: project.id,
      name: project.name,
      theme: project.theme,
      description: project.description
    } as GetProjectDto;
  }
}
