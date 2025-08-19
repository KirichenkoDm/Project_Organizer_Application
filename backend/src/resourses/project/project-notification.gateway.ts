import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserRepository } from '../user/user.repository';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ProjectGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository
  ) {}

  async handleConnection(socket: Socket) {
    try {
      const token = socket.handshake.auth.accessToken || socket.handshake.auth.token || socket.handshake.headers?.authorization?.split(' ')[1];

      console.log(`Ask for connection by: ${token}`);

      if (!token) {
        throw new UnauthorizedException('Access token missing');
      }

      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });

      if (!payload?.sub) {
        throw new UnauthorizedException('Invalid token payload');
      }

      const userId = payload.sub;
      const user = await this.userRepository.findById(userId);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      if (!user.isAdmin) {
        throw new ForbiddenException('User is not an admin');
      }

      console.log(`Connecting ${user.email}`);

      socket.join('admins');
      console.log(`Admin connected: ${user.email}`);

    } catch (error) {
      console.error('Socket connection error:', error.message);
      socket.disconnect(true);
    }
  }

  handleDisconnect(socket: Socket) {
    console.log(`Admin disconnected: ${socket.id}`);
  }

  notifyAdmins(message: string) {
    this.server.to('admins').emit('notification', { message });
  }
}
