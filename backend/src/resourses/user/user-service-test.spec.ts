import { Test, TestingModule } from "@nestjs/testing";
import { RoleRepository } from "../role/role.repository";
import { UserCore } from "./user.core";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtService } from "@nestjs/jwt";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { RoleNamesEnum } from "src/shared/role-names.enum";
import { UserEntity } from "./user.entity";
import { TokensDto } from "src/shared/dto/token.dto";
import { GetUserWithRoleDto } from "./dto/get-user.dto";
import * as bcrypt from "bcrypt";
import { generateTokens } from "src/shared/generate-tokens";

process.env.JWT_ACCESS_SECRET = "test-secret";
process.env.JWT_REFRESH_SECRET = "test-refresh-secret";

jest.mock("bcrypt");


describe("UserService", () => {
  let service: UserService;
  let userRepository: UserRepository
  let userCore: UserCore;
  let roleRepository: RoleRepository;

  const mockUser: UserEntity = {
    id: 1,
    email: "test@example.com",
    password: "hashedPassword123",
    firstName: "Test",
    lastName: "User",
    refreshToken: "refreshToken123",
    createdAt: new Date(),
    updatedAt: new Date(),
    archivedAt: new Date(),
  };

  const mockCreateUserDto: CreateUserDto = {
    email: "test@example.com",
    password: "password123",
    firstName: "Test",
    lastName: "User",
  };

  const mockUpdateUserDto: UpdateUserDto = {
    firstName: "Updated",
    lastName: "Fully",
  };

  const mockUpdateUserDtoWithPassword: UpdateUserDto = {
    ...mockUpdateUserDto,
    password: "newPassword123",
  }

  const mockUsersWithRoles: GetUserWithRoleDto[] = [
    {
      id: 1,
      email: "test@example.com",
      firstName: "Test",
      lastName: "User",
      role: RoleNamesEnum.Member,
    },
    {
      id: 2,
      email: "test2@example.com",
      firstName: "Test2",
      lastName: "User2",
      role: RoleNamesEnum.Owner,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        UserCore,
        {
          provide: UserRepository,
          useValue: {
            findById: jest.fn(),
            findByEmail: jest.fn(),
            findByEmailWithPassword: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn(),
            softDelete: jest.fn(),
            setRefreshToken: jest.fn(),
          },
        },
        {
          provide: RoleRepository,
          useValue: {
            findUsersByProjectId: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
    userCore = module.get<UserCore>(UserCore);
    roleRepository = module.get<RoleRepository>(RoleRepository);
    jest.spyOn(module.get<JwtService>(JwtService), 'sign').mockReturnValue('test-token');
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getUserById", () => {
    it("should return a user when user exists", async () => {
      jest.spyOn(userRepository, "findById").mockResolvedValue(mockUser);

      const result = await service.getUserById(1);

      expect(userRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(expect.objectContaining({
        id: mockUser.id,
        email: mockUser.email,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
      }));
    });

    it("should throw NotFoundException when user does not exist", async () => {
      jest.spyOn(userRepository, "findById").mockResolvedValue(null);

      await expect(service.getUserById(999)).rejects
        .toThrow(new NotFoundException("User with this id not found"));
      expect(userRepository.findById).toHaveBeenCalledWith(999);
    });
  });

  describe("getUserByEmail", () => {
    it("should return a user when user exists", async () => {
      jest.spyOn(userRepository, "findByEmail").mockResolvedValue(mockUser);

      const result = await service.getUserByEmail("test@example.com");

      expect(userRepository.findByEmail).toHaveBeenCalledWith("test@example.com");
      expect(result).toEqual(expect.objectContaining({
        id: mockUser.id,
        email: mockUser.email,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
      }));
    });

    it("should throw NotFoundException when user does not exist", async () => {
      jest.spyOn(userRepository, "findByEmail").mockResolvedValue(null);

      await expect(service.getUserByEmail("nonexistent@example.com"))
        .rejects.toThrow(new NotFoundException("User with this email not found"));
      expect(userRepository.findByEmail).toHaveBeenCalledWith("nonexistent@example.com");
    });
  });

  describe("getUserWithPasswordByEmail", () => {
    it("should return a user with password when user exists", async () => {
      jest.spyOn(userRepository, "findByEmailWithPassword").mockResolvedValue(mockUser);

      const result = await service.getUserWithPasswordByEmail("test@example.com");

      expect(userRepository.findByEmailWithPassword).toHaveBeenCalledWith("test@example.com");
      expect(result).toEqual(expect.objectContaining({
        id: mockUser.id,
        email: mockUser.email,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        password: mockUser.password,
      }));
    });

    it("should throw NotFoundException when user does not exist", async () => {
      jest.spyOn(userRepository, "findByEmailWithPassword").mockResolvedValue(null);

      await expect(service.getUserWithPasswordByEmail("nonexistent@example.com"))
        .rejects.toThrow(new NotFoundException("User with this email not found"));
      expect(userRepository.findByEmailWithPassword).toHaveBeenCalledWith("nonexistent@example.com");
    });
  });

  describe("getUsersByProjectId", () => {
    it("should return list of users with roles when project and users exist", async () => {
      jest.spyOn(roleRepository, "findUsersByProjectId").mockResolvedValue(mockUsersWithRoles);

      const result = await service.getUsersByProjectId(1);

      expect(roleRepository.findUsersByProjectId).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockUsersWithRoles);
    });

    it("should throw NotFoundException when no users are found for project", async () => {
      jest.spyOn(roleRepository, "findUsersByProjectId").mockResolvedValue([]);

      await expect(service.getUsersByProjectId(999)).rejects
        .toThrow(new NotFoundException("Users related with this project not found"));
      expect(roleRepository.findUsersByProjectId).toHaveBeenCalledWith(999);
    });

    it("should throw NotFoundException when project not found", async () => {
      jest.spyOn(roleRepository, "findUsersByProjectId").mockResolvedValue(null);

      await expect(service.getUsersByProjectId(999))
        .rejects.toThrow(new NotFoundException("Users related with this project not found"));
      expect(roleRepository.findUsersByProjectId).toHaveBeenCalledWith(999);
    });
  });

  describe("createUser", () => {
    beforeEach(() => {
      (bcrypt.genSalt as jest.Mock).mockResolvedValue("mockedSalt");
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword123");

      // jest.spyOn(module.get<JwtService>(JwtService), 'sign').mockReturnValue('test-token');
    });

    it("should create a user and return tokens", async () => {
      const savedUser = { ...mockCreateUserDto, id: 1, password: "hashedPassword123" };
      jest.spyOn(userRepository, "save").mockResolvedValue(mockUser);
      jest.spyOn(userRepository, "setRefreshToken").mockResolvedValue({
        message: "Refresh token set",
        status: 200,
        isSuccess: true,
      });
      
      const result = await service.createUser({...mockCreateUserDto});

      expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
      expect(bcrypt.hash).toHaveBeenCalledWith(mockCreateUserDto.password, "mockedSalt");
      expect(userRepository.save).toHaveBeenCalledWith({
        ...mockCreateUserDto,
        password: "hashedPassword123",
      });
      expect(userRepository.setRefreshToken).toHaveBeenCalledWith(savedUser.id, expect.any(String));
      expect(result).toEqual({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      });
    });

    it('should throw BadRequestException when user is not created', async () => {
      jest.spyOn(userRepository, "save").mockResolvedValue(null);

      await expect(service.createUser({ ...mockCreateUserDto })).rejects
        .toThrow(new BadRequestException("User was not created"));
      expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
      expect(bcrypt.hash).toHaveBeenCalledWith(mockCreateUserDto.password, "mockedSalt");
      expect(userRepository.save).toHaveBeenCalledWith({
        ...mockCreateUserDto,
        password: "hashedPassword123",
      });
    });
  });

  describe("updateUserById", () => {
    beforeEach(() => {
      (bcrypt.genSalt as jest.Mock).mockResolvedValue("mockedSalt");
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword123");

      // jest.spyOn(module.get<JwtService>(JwtService), 'sign').mockReturnValue('test-token');
    });

    it("should update user without password and return updated user", async () => {
      jest.spyOn(userRepository, "findOneBy").mockResolvedValue(mockUser);
      const updatedUser = { ...mockUser, ...mockUpdateUserDto };
      jest.spyOn(userRepository, "save").mockResolvedValue(updatedUser);

      const result = await service.updateUserById(1, {...mockUpdateUserDto});

      expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: 1});
      expect(userRepository.save).toHaveBeenCalledWith({
        ...mockUser,
        ...mockUpdateUserDto,
      });
      expect(result).toEqual(expect.objectContaining({
        id: mockUser.id,
        email: mockUser.email,
        firstName: mockUpdateUserDto.firstName,
        lastName: mockUpdateUserDto.lastName,
      }));
    });

    it("should update user with password and return updated user", async () => {
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashedNewPassword");
      jest.spyOn(userRepository, "findOneBy").mockResolvedValue(mockUser);
      const updatedUser = {
        ...mockUser,
        firstName: mockUpdateUserDtoWithPassword.firstName,
        lastName: mockUpdateUserDtoWithPassword.lastName,
        password: "hashedNewPassword"
      };
      jest.spyOn(userRepository, "save").mockResolvedValue(updatedUser);

      const result = await service.updateUserById(1, {...mockUpdateUserDtoWithPassword});

      expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
      expect(bcrypt.hash).toHaveBeenCalledWith(mockUpdateUserDtoWithPassword.password, "mockedSalt");
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(userRepository.save).toHaveBeenCalledWith(expect.objectContaining({
        ...mockUser,
        ...mockUpdateUserDtoWithPassword,
        password: "hashedNewPassword",
      }));
      expect(result).toEqual(expect.objectContaining({
        id: mockUser.id,
        email: mockUser.email,
        firstName: mockUpdateUserDtoWithPassword.firstName,
        lastName: mockUpdateUserDtoWithPassword.lastName,
      }));
    });

    it("should throw NotFoundException when user to update does not exist", async () => {
      jest.spyOn(userRepository, "findOneBy").mockResolvedValue(null);

      await expect(service.updateUserById(999, mockUpdateUserDto)).rejects
        .toThrow(new NotFoundException("User with this id not found"));
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: 999 });
      expect(userRepository.save).not.toHaveBeenCalled();
    });
  });

  describe("deleteUserById", () => {
    it("should delete user and return success response", async () => {
      jest.spyOn(userRepository, "findOneBy").mockResolvedValue(mockUser);
      jest.spyOn(userRepository, "softDelete").mockResolvedValue({ affected: 1, raw: [], generatedMaps: []});

      const result = await service.deleteUserById(1);

      expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(userRepository.softDelete).toHaveBeenCalledWith(1);
      expect(result).toEqual({
        message: "User successfully deleted",
        status: 204,
        isSuccess: true,
      });
    });

    it("should throw NotFoundException when user to delete does not exist", async () => {
      jest.spyOn(userRepository, "findOneBy").mockResolvedValue(null);

      await expect(service.deleteUserById(999)).rejects
        .toThrow(new NotFoundException("User with this id not found"));
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: 999 });
      expect(userRepository.softDelete).not.toHaveBeenCalled();
    });

    it("should throw BadRequestException when softDelete fails", async () => {
      jest.spyOn(userRepository, "findOneBy").mockResolvedValue(mockUser);
      jest.spyOn(userRepository, "softDelete").mockResolvedValue({ affected: 0, raw: [], generatedMaps: [] });

      await expect(service.deleteUserById(1)).rejects
        .toThrow(new BadRequestException("User was not deleted"));
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(userRepository.softDelete).toHaveBeenCalledWith(1);
    });
  });
});