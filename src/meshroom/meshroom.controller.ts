import { Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { MeshroomService } from './meshroom.service';
import { MeshroomRunInterceptor } from './interceptors/meshroom.run.interceptor';

@Controller('meshroom')
export class MeshroomController {
  constructor(private readonly meshroomService: MeshroomService) {}

  @Post('run')
  @UseInterceptors(MeshroomRunInterceptor)
  run() {
    this.meshroomService.run();
    return 'OK';
  }

  @Get('stop')
  stop() {
    return this.meshroomService.stop();
  }

  @Get('state')
  state() {
    return this.meshroomService.getState();
  }
}
