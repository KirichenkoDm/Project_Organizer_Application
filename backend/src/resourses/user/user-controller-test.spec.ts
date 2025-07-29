import { BadRequestException, INestApplication, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BasicResponseDto } from 'src/shared/dto/basic-response.dto';
import { TokensDto } from 'src/shared/dto/token.dto';
import { RoleNamesEnum } from 'src/shared/role-names.enum';
import * as request from 'supertest';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto, GetUserWithRoleDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let userService = {
    getUsersByEmail: jest.fn(),
    getUserById: jest.fn(),
    getUsersByProjectId: jest.fn(),
    createUser: jest.fn(),
    updateUserById: jest.fn(),
    deleteUserById: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: userService,
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/GET user/search', () => {
    it('should return array of users by email', () => {
      const mockUsers: GetUserDto[] = [
        { id: 1, email: 'example@gmail.com', firstName: 'John', lastName: 'Doe' },
      ];
      userService.getUsersByEmail.mockResolvedValue(mockUsers);

      return request(app.getHttpServer())
        .get('/user/search')
        .query({ email: 'test@test.com', currentProjectId: 1 })
        .expect(200)
        .expect(mockUsers);
    });

    it('should return 404 if no users found', async () => {
      userService.getUsersByEmail.mockRejectedValue(new NotFoundException('Users with similar email not found'));

      return request(app.getHttpServer())
        .get('/user/search')
        .query({ email: 'notfound@test.com', currentProjectId: 1 })
        .expect(404)
        .expect(res => {
          expect(res.body.message).toBe('Users with similar email not found');
        });
    });
  });


  describe('/GET user/:id', () => {
    it('should return a user by id', () => {
      const mockUser: GetUserDto =
        { id: 1, email: 'example@gmail.com', firstName: 'John', lastName: 'Doe' };
      userService.getUserById.mockResolvedValue(mockUser);

      return request(app.getHttpServer())
        .get('/user/1')
        .expect(200)
        .expect(mockUser);
    });

    it('should return 404 if user not found', async () => {
      userService.getUserById.mockRejectedValue(new NotFoundException('User with this id not found'));

      return request(app.getHttpServer())
        .get('/user/999')
        .expect(404)
        .expect(res => {
          expect(res.body.message).toBe('User with this id not found');
        });
    });
  });

  describe('/GET user/project/:id', () => {
    it('should return users with roles by project id', () => {
      const mockUsers: GetUserWithRoleDto[] = [
        { id: 1, email: 'example@gmail.com', firstName: 'John', lastName: 'Doe', role: RoleNamesEnum.admin },
      ];
      userService.getUsersByProjectId.mockResolvedValue(mockUsers);

      return request(app.getHttpServer())
        .get('/user/project/1')
        .expect(200)
        .expect(mockUsers);
    });

    it('should return 404 if no users for project', async () => {
      userService.getUsersByProjectId.mockRejectedValue(
        new NotFoundException('Users related with this project not found'),
      );

      return request(app.getHttpServer())
        .get('/user/project/999')
        .expect(404)
        .expect(res => {
          expect(res.body.message).toBe('Users related with this project not found');
        });
    });
  });

  describe('/POST user', () => {
    it('should create a user and return tokens', () => {
      const dto: CreateUserDto = { email: 'example@gmail.com', password: '123456' } as any;
      const tokens: TokensDto = { accessToken: 'access', refreshToken: 'refresh' };
      userService.createUser.mockResolvedValue(tokens);

      return request(app.getHttpServer())
        .post('/user')
        .send(dto)
        .expect(201)
        .expect(tokens);
    });

    it('should return 400 if user was not created', async () => {
      const dto: CreateUserDto = { email: 'fail@test.com', password: '1234' } as any;
      userService.createUser.mockRejectedValue(new BadRequestException('User was not created'));

      return request(app.getHttpServer())
        .post('/user')
        .send(dto)
        .expect(400)
        .expect(res => {
          expect(res.body.message).toBe('User was not created');
        });
    });
  });

  describe('/PUT user/:id', () => {
    it('should update a user by id', () => {
      const dto: UpdateUserDto = { firstName: 'Jane' } as any;
      const updatedUser: GetUserDto =
        { id: 1, email: 'example@gmail.com', firstName: 'Jane', lastName: 'Doe' };
      userService.updateUserById.mockResolvedValue(updatedUser);

      return request(app.getHttpServer())
        .put('/user/1')
        .send(dto)
        .expect(200)
        .expect(updatedUser);
    });

    it('should return 404 if user to update not found', async () => {
      const dto: UpdateUserDto = { firstName: 'NoOne' } as any;
      userService.updateUserById.mockRejectedValue(new NotFoundException('User with this id not found'));

      return request(app.getHttpServer())
        .put('/user/999')
        .send(dto)
        .expect(404)
        .expect(res => {
          expect(res.body.message).toBe('User with this id not found');
        });
    });
  });

  describe('/DELETE user/:id', () => {
    it('should delete a user by id', () => {
      const response: BasicResponseDto = {
        message: "User successfully deleted",
        status: 204,
        isSuccess: true,
      };
      userService.deleteUserById.mockResolvedValue(response);

      return request(app.getHttpServer())
        .delete('/user/1')
        .expect(200)
        .expect(response);
    });

    it('should return 404 if user not found', async () => {
      userService.deleteUserById.mockRejectedValue(new NotFoundException('User with this id not found'));

      return request(app.getHttpServer())
        .delete('/user/999')
        .expect(404)
        .expect(res => {
          expect(res.body.message).toBe('User with this id not found');
        });
    });

    it('should return 400 if user was not deleted', async () => {
      userService.deleteUserById.mockRejectedValue(new BadRequestException('User was not deleted'));

      return request(app.getHttpServer())
        .delete('/user/2')
        .expect(400)
        .expect(res => {
          expect(res.body.message).toBe('User was not deleted');
        });
    });
  });
});