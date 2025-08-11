import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ProjectRepository } from "./project.repository";
import { GetProjectDto } from "./dto/get-project.dto";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { BasicResponseDto } from "src/shared/dto/basic-response.dto";
import { RoleRepository } from "../role/role.repository";
import { RoleService } from "../role/role.service";
import { RoleNamesEnum } from "src/shared/role-names.enum";
import { ProjectCore } from "./project.core";
import { CreateRoleDto } from "../role/dto/create-role.dto";
import { ProjectGateway } from "./project-notification.gateway";

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly roleRepository: RoleRepository,
    private readonly roleService: RoleService,
    private readonly projectCole: ProjectCore,
    private readonly projectGateway: ProjectGateway,
  ) { }

  async getProjectById(id: number): Promise<GetProjectDto> {
    const project = await this.projectRepository.findOneBy({ id });

    if (!project) {
      throw new NotFoundException("Project with this id not found");
    }

    return this.projectCole.mapperEntityToGetDTO(project);
  }

  async getProjectsByUserId(userId: number): Promise<GetProjectDto[]> {
    const projects = await this.roleRepository.findProjectsByUserId(userId);

    if (!projects || projects.length === 0) {
      throw new NotFoundException("No projects found for this user");
    }

    return projects.map(proj => this.projectCole.mapperEntityToGetDTO(proj))
  }

  async getProjectReportById(id: number): Promise<object> {
    const report = this.projectRepository.findReportById(id);

    if (!report) {
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
      user: { id: projectData.creatorId },
      project: { id: project.id },
      role: RoleNamesEnum.Owner
    } as CreateRoleDto;
    await this.roleService.createRole(roleData);

    this.projectGateway.notifyAdmins(
      `New project created: ${project.name}`
    );

    return this.projectCole.mapperEntityToGetDTO(project);
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

    if (!project) {
      throw new BadRequestException("Project was not updated");
    }

    return this.projectCole.mapperEntityToGetDTO(project);
  }

  async deleteProjectById(id: number): Promise<BasicResponseDto> {
    const projectToDelete = await this.projectRepository.findOneBy({ id });

    if (!projectToDelete) {
      throw new NotFoundException("Project with this id not found");
    }

    const result = await this.projectRepository.softDelete(id);

    if (result.affected === 0) {
      throw new BadRequestException("Project was not deleted");
    }

    return {
      message: "Project successsfully deleted",
      status: 204,
      isSuccess: true,
    }
  }
}
