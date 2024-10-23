import { Module } from '@nestjs/common';
import { FileModule } from './files/file.module';
import { MeshroomModule } from './meshroom/meshroom.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BlenderModule } from './blender/blender.module';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from './cache/cache.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    FileModule,
    MeshroomModule,
    BlenderModule,
    CacheModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User],
        logging: configService.get('NODE_ENV') === 'development',
        synchronize: configService.get('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
})
export class AppModule {}
