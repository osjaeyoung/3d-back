import { Module } from '@nestjs/common';
import { FileModule } from './files/file.module';
import { MeshroomModule } from './meshroom/meshroom.module';
import { ConfigModule } from '@nestjs/config';
import { BlenderModule } from './blender/blender.module';

@Module({
  imports: [
    FileModule,
    MeshroomModule,
    BlenderModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
  ],
})
export class AppModule {}
