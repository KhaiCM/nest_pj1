import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'

import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { ServiceModule } from './users/service/service.module';
import { TasksModule } from './tasks/tasks.module';
import databaseConfig from './config/database';
import appConfig from './config/app';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        appConfig
      ]
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: databaseConfig().database_host,
      port: databaseConfig().database_port,
      username: databaseConfig().database_username,
      password: databaseConfig().database_password,
      database: databaseConfig().database,
      entities: [],
    }),
    DatabaseModule,
    ServiceModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
