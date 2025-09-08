import { Controller, Get } from '@nestjs/common';
import { Public } from './shared/public.decorator';

@Controller()
export class AppController {
  @Public()
  @Get()
  getRoot() {
    return { status: 'ok' };
  }
}
