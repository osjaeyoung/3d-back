import { Module } from '@nestjs/common';
import { MeshroomController } from './meshroom.controller';
import { MeshroomService } from './meshroom.service';

@Module({
  controllers: [MeshroomController],
  providers: [MeshroomService],
})
export class MeshroomModule {}
