import { Module } from '@nestjs/common';
import { MeshroomController } from './meshroom.controller';
import { MeshroomService } from './meshroom.service';
import { RedisCacheService } from 'src/cache/cache.service';

@Module({
  controllers: [MeshroomController],
  providers: [MeshroomService, RedisCacheService],
})
export class MeshroomModule {}
