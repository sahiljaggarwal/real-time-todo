import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './todo.schema';
import mongoose, { Model } from 'mongoose';
import { TodoDto } from './todo.dto';
import { TodoGateway } from './todo.gateway';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<Todo>,
    private readonly todogateway: TodoGateway,
  ) {}

  // create todo
  async addTodo(todoDto: TodoDto): Promise<any> {
    const { username, description, title } = todoDto;
    if (!username || !description || !title) {
      throw new BadRequestException('Please fill all fields');
    }
    const todo = new this.todoModel(todoDto);
    const data = await todo.save();
    if (!data) {
      throw new NotFoundException('Todo Not Created');
    }

    this.todogateway.handleTodoCreated(null, data);
    return data;
  }

  // get all todos
  async TodoList(): Promise<Todo[]> {
    const data = await this.todoModel.find();
    if (!data) {
      throw new NotFoundException('Todo Not Found');
    }
    this.todogateway.handleTodoList(null, data);
    return data;
  }

  // get todo by id
  async TodoListById(id: any): Promise<Todo> {
    const data = await this.todoModel.findById(id);
    if (!data) {
      throw new NotFoundException('Todo Not Found');
    }
    this.todogateway.handleTodoListById(null, data);
    return data;
  }

  // update todo
  async TodoUpdate(id: any, todoDto: TodoDto): Promise<Todo> {
    const data = await this.todoModel.findByIdAndUpdate(id, todoDto, {
      new: true,
    });
    if (!data) {
      throw new NotFoundException('Todo Not Found');
    }
    this.todogateway.handleTodoUpdate(null, data);
    return data;
  }

  // delete todo
  async TodoDelete(id: any): Promise<any> {
    console.log('id', id);
    console.log('obj id', new mongoose.Types.ObjectId(id));
    const objId = new mongoose.Types.ObjectId(id);
    const data = await this.todoModel.deleteOne({
      _id: objId,
    });
    if (!data) {
      throw new NotFoundException('Todo Not Found');
    }
    this.todogateway.handleTodoDelete(null, data);
    return data;
  }

  // Is Completed todo
  async TodoIsCompleted(id: any): Promise<Todo> {
    const objId = new mongoose.Types.ObjectId(id);
    const data = await this.todoModel.findByIdAndUpdate(
      objId,
      { isComplete: true },
      { new: true },
    );
    if (!data) {
      throw new NotFoundException('Todo Not Found');
    }
    this.todogateway.handleTodoIsComplete(null, data);
    return data;
  }
}
