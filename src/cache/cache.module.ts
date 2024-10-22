import { Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ConfigService } from '@nestjs/config';
import { RedisCacheService } from './cache.service';

@Module({
  imports: [
    RedisModule.forRootAsync(
      {
        useFactory: async (configService: ConfigService) => ({
          readyLog: true,
          config: {
            host: configService.get('REDIS_HOSTNAME'),
            port: configService.get('REDIS_PORT'),
            password: configService.get('REDIS_PASSWORD'),
          },
        }),
        inject: [ConfigService],
      },
      true,
    ),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class CacheModule {}
