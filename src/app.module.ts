import { Module } from '@nestjs/common';
import { FileModule } from './files/file.module';

@Module({
  imports: [FileModule],
})
export class AppModule {}
