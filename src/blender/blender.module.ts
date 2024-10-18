import { Module } from '@nestjs/common';
import { BlenderController } from './blender.controller';
import { BlenderService } from './blender.service';

@Module({
  controllers: [BlenderController],
  providers: [BlenderService],
})
export class BlenderModule {}
