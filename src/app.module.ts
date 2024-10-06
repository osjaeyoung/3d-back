import { Module } from '@nestjs/common';
import { FileModule } from './files/file.module';
import { MeshroomModule } from './meshroom/meshroom.module';

@Module({
  imports: [FileModule, MeshroomModule],
})
export class AppModule {}
