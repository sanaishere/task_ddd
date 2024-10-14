import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import {CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/Infrastructure/adopter/output/user.entity';
import { TaskEntity } from './task/Infrastructure/adopters/output/task.entity';
import { ConfigModule } from '@nestjs/config';
require('dotenv').config()
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: 3306,
      username:process.env.MYSQL_USER,
      password:process.env.MYSQL_PASSWORD,
      database:process.env.MYSQL_DB,
      entities: [UserEntity,TaskEntity],
      synchronize: true,
    }
  ),TaskModule,UserModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
