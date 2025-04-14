import { GetProjectDto } from "./dto/get-project.dto";
import { ProjectEntity } from "./projects.entity";

export class ProjectCore {
  mapperEntityToGetDTO(project: ProjectEntity): GetProjectDto {
    return {
      id: project.id,
      name: project.name,
      theme: project.theme,
      description: project.description
    } as GetProjectDto;
  }
}