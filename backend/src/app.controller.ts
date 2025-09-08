import { Controller, Get } from '@nestjs/common';
import { Public } from './shared/public.decorator';
import { SkipRoles } from './shared/roles.decorator';

@Controller()
export class AppController {
  @Public()
  @SkipRoles()
  @Get()
  getRoot() {
    return { status: 'ok' };
  }
}
