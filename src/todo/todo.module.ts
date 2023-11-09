import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoGateway } from './todo.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import {Todo, TodoSchema} from './todo.schema';

@Module({
  imports : [MongooseModule.forFeature([{name:Todo.name, schema:TodoSchema}])],
  controllers: [TodoController],
  providers: [TodoService, TodoGateway]
})
export class TodoModule {}
