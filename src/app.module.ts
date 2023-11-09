import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoGateway } from './todo/todo.gateway';
import { TodoModule } from './todo/todo.module';
import * as dotenv from 'dotenv'
dotenv.config()

@Module({
  imports: [MongooseModule.forRoot(process.env.mongodb), TodoModule],
  controllers: [AppController],
  providers: [AppService, TodoGateway],
})
export class AppModule {}
