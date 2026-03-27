import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ssl: process.env.STAGE === 'prod',
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true, // Disable in production
    }),
    AuthModule,
    SeedModule,
    ExercisesModule,
    FilesModule,
    CloudinaryModule,
    CommonModule,
    EquipmentsModule,
    MusclesModule,
  ],
  controllers: [],
  providers: [DatabaseExceptionService],
})
export class AppModule {}
