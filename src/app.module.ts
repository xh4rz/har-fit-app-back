import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';
import { ExercisesModule } from './exercises/exercises.module';
import { FilesModule } from './files/files.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CommonModule } from './common/common.module';
import { DatabaseExceptionService } from './common/services';
import { EquipmentsModule } from './equipments/equipments.module';
import { MusclesModule } from './muscles/muscles.module';
import { RoutinesModule } from './routines/routines.module';
import { UsersModule } from './users/users.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ssl: configService.get<string>('nodeEnv') === 'production',
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        database: configService.get<string>('database.name'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        synchronize: configService.get<string>('nodeEnv') !== 'production',
        autoLoadEntities: true,
      }),
    }),
    AuthModule,
    SeedModule,
    ExercisesModule,
    FilesModule,
    CloudinaryModule,
    CommonModule,
    EquipmentsModule,
    MusclesModule,
    RoutinesModule,
    UsersModule,
  ],
  controllers: [],
  providers: [DatabaseExceptionService],
})
export class AppModule {}
