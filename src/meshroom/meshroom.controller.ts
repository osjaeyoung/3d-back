import { Controller, Post } from '@nestjs/common';
import { MeshroomService } from './meshroom.service';

@Controller('meshroom')
export class MeshroomController {
  constructor(private readonly meshroomService: MeshroomService) {}

  @Post('run')
  run() {
    console.log('OK');
  }
}
