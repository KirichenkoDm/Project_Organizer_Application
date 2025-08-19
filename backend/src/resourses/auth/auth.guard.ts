import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../../shared/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context) {
    const contextType = context.getType();
    console.log(context.args[0].url);
    console.log(contextType);
    if (contextType === 'ws') {
      console.log('WebSocket context detected, skipping JwtAuthGuard');
      return true;
    }
    
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
    
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}