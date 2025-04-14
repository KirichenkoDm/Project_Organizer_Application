import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { ROLES_KEY, SKIP_ROLES_KEY } from "./roles.decorator";
import { RoleNamesEnum } from "./role-names.enum";
import { RoleRepository } from "src/resourses/role/role.repository";

const rolePriority = {
  [RoleNamesEnum.Member]: 1,
  [RoleNamesEnum.ProjectManager]: 2,
  [RoleNamesEnum.Owner]: 3,
};

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private roleRepository: RoleRepository,
    private jwtService: JwtService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skipRoles = this.reflector.getAllAndOverride<boolean>(
      SKIP_ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    const allowedRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler()
    )  
    
    if (skipRoles || allowedRoles.length === 0 || !allowedRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    
    if (!token) {
      throw new UnauthorizedException("Access token missing");
    }
    
    const payload = this.jwtService.verify(token);
    const userId = payload.sub;
    const projectId = Number(request.query.currentProjectId);

    if (!userId || !projectId) {
      throw new UnauthorizedException("Invalid token or project id");
    }

    const userRole = await this.roleRepository.findRole(userId, projectId);

    if (!userRole) {
      throw new ForbiddenException("User has no role in this project");
    }

    const userRolePriority = rolePriority[userRole];

    const isAccessed = allowedRoles.some(allowed => {
      const requiredRolePriority = rolePriority[allowed];
      return userRolePriority >= requiredRolePriority;
    });

    if (!isAccessed) {
      throw new ForbiddenException("Access denied for current role");
    }

    return true;
  }
}