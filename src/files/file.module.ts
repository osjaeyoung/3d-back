import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { RedisCacheService } from 'src/cache/cache.service';

@Module({
  controllers: [FileController],
  providers: [FileService, RedisCacheService],
})
export class FileModule {}
