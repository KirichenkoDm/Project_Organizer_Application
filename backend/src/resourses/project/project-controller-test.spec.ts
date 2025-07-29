import { INestApplication } from '@nestjs/common';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { RoleRepository } from 'src/resourses/role/role.repository';
import { RoleNamesEnum } from 'src/shared/role-names.enum';
import { RoleGuard } from 'src/shared/role.guard';
import * as request from 'supertest';
import { GetProjectDto } from './dto/get-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectThemeEnum } from './project-theme.enum';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { ValidationPipe } from 'src/shared/validation.pipe';

describe('ProjectController with RoleGuard (e2e)', () => {
  let app: INestApplication;

  const mockProjectService = {
    getProjectById: jest.fn(),
    updateProjectById: jest.fn(),
  };

  const mockRoleRepository = {
    findRole: jest.fn(),
  };

  const mockJwtService = {
    decode: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ProjectController],
      providers: [
        { provide: ProjectService, useValue: mockProjectService },
        { provide: RoleRepository, useValue: mockRoleRepository },
        { provide: JwtService, useValue: mockJwtService },
        Reflector,
        { provide: APP_GUARD, useClass: RoleGuard },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/GET project/:id (with RoleGuard)', () => {
    it('should allow access for user with sufficient role', async () => {
      const project: GetProjectDto =
        { id: 1, name: 'Test Project', theme: ProjectThemeEnum.ComputerScience, description: 'Desc' };
      mockProjectService.getProjectById.mockResolvedValue(project);
      mockJwtService.decode.mockReturnValue({ sub: 123 });
      mockRoleRepository.findRole.mockResolvedValue(RoleNamesEnum.Member);

      return request(app.getHttpServer())
        .get('/project/1')
        .query({ currentProjectId: 1 })
        .set('Authorization', 'Bearer valid-token')
        .expect(200)
        .expect(project);
    });

    it('should return 401 if token is missing', async () => {
      return request(app.getHttpServer())
        .get('/project/1')
        .query({ currentProjectId: 1 })
        .expect(401)
        .expect(res => {
          expect(res.body.message).toBe('Access token missing');
        });
    });

    it('should return 403 if user has no role in this project', async () => {
      mockJwtService.decode.mockReturnValue({ sub: 123 });
      mockRoleRepository.findRole.mockResolvedValue(null);

      return request(app.getHttpServer())
        .get('/project/1')
        .query({ currentProjectId: 1 })
        .set('Authorization', 'Bearer valid-token')
        .expect(403)
        .expect(res => {
          expect(res.body.message).toBe('User has no role in this project');
        });
    });

    it('should return 403 if user role is insufficient', async () => {
      mockJwtService.decode.mockReturnValue({ sub: 123 });
      mockRoleRepository.findRole.mockResolvedValue(RoleNamesEnum.Member);

      return request(app.getHttpServer())
        .put('/project/1')
        .query({ currentProjectId: 1 })
        .set('Authorization', 'Bearer valid-token')
        .send({ name: 'Updated Project' } as UpdateProjectDto)
        .expect(403)
        .expect(res => {
          expect(res.body.message).toBe('Access denied for current role');
        });
    });
  });

  describe('/PUT project/:id (Owner only)', () => {
    it('should allow Owner to update project', async () => {
      const updatedProject: GetProjectDto =
        { id: 1, name: 'Updated Project', theme: ProjectThemeEnum.ComputerScience, description: 'New desc' };
      mockProjectService.updateProjectById.mockResolvedValue(updatedProject);
      mockJwtService.decode.mockReturnValue({ sub: 123 });
      mockRoleRepository.findRole.mockResolvedValue(RoleNamesEnum.Owner);

      return request(app.getHttpServer())
        .put('/project/1')
        .query({ currentProjectId: 1 })
        .set('Authorization', 'Bearer valid-token')
        .send({ name: 'Updated Project' } as UpdateProjectDto)
        .expect(200)
        .expect(updatedProject);
    });

    it('should update project with valid data', async () => {
      const validDto = {
        name: 'Valid Project',
        theme: ProjectThemeEnum.ComputerScience,
        description: 'This is a valid description',
      };

      const updatedProject: GetProjectDto = {
        id: 1,
        name: validDto.name,
        theme: validDto.theme,
        description: validDto.description,
      };

      mockProjectService.updateProjectById.mockResolvedValue(updatedProject);
      mockJwtService.decode.mockReturnValue({ sub: 123 });
      mockRoleRepository.findRole.mockResolvedValue(RoleNamesEnum.Owner);

      return request(app.getHttpServer())
        .put('/project/1')
        .query({ currentProjectId: 1 })
        .set('Authorization', 'Bearer valid-token')
        .send(validDto)
        .expect(200)
        .expect(updatedProject);
    });

    it('should return 400 if name is too short', async () => {
      const invalidDto = {
        name: 'abc',
        theme: ProjectThemeEnum.ComputerScience,
        description: 'Valid description text',
      };

      mockJwtService.decode.mockReturnValue({ sub: 123 });
      mockRoleRepository.findRole.mockResolvedValue(RoleNamesEnum.Owner);

      return request(app.getHttpServer())
        .put('/project/1')
        .query({ currentProjectId: 1 })
        .set('Authorization', 'Bearer valid-token')
        .send(invalidDto)
        .expect(400)
        .expect(res => {
          expect(res.body.message).toMatch(/name: .*must be/);
        });
    });

    it('should return 400 if theme is invalid', async () => {
      const invalidDto = {
        name: 'Valid Name',
        theme: 'InvalidTheme',
        description: 'Valid description text',
      };

      mockJwtService.decode.mockReturnValue({ sub: 123 });
      mockRoleRepository.findRole.mockResolvedValue(RoleNamesEnum.Owner);

      return request(app.getHttpServer())
        .put('/project/1')
        .query({ currentProjectId: 1 })
        .set('Authorization', 'Bearer valid-token')
        .send(invalidDto)
        .expect(400)
        .expect(res => {
          expect(res.body.message).toMatch(/theme: .*must be/);
        });
    });
  });
});