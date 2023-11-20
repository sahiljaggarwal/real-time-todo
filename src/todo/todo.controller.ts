import {
  Body,
  Controller,
  HttpCode,
  Post,
  Get,
  Put,
  Delete,
  Patch,
  Param,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { SuccessResponse } from 'src/common/SuccessResponse';
import { ErrorResponse } from 'src/common/ErrorResponse';
import { TodoDto } from './todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // Add Todo
  @Post()
  @HttpCode(201)
  async addTodo(
    @Body() todoDto: TodoDto,
  ): Promise<SuccessResponse<any> | ErrorResponse> {
    try {
      const data = await this.todoService.addTodo(todoDto);
      console.log('data: ', data);
      return new SuccessResponse(data, true);
    } catch (error) {
      console.log(error);
      return new ErrorResponse('Internal Server Error', 500, false);
    }
  }

  // Get All Todo
  @Get()
  @HttpCode(200)
  async TodoList(): Promise<SuccessResponse<any> | ErrorResponse> {
    try {
      const data = await this.todoService.TodoList();
      return new SuccessResponse(data, true);
    } catch (error) {
      console.log(error);
      return new ErrorResponse('Internal Server Error', 500, false);
    }
  }

  // Get Todo By Id
  @Get(':id')
  @HttpCode(200)
  async TodoListById(
    @Param('id') id: string,
  ): Promise<SuccessResponse<any> | ErrorResponse> {
    try {
      // console.log('id',id);
      const data = await this.todoService.TodoListById(id);
      return new SuccessResponse(data, true);
    } catch (error) {
      console.log(error);
      return new ErrorResponse('Internal Server Error', 500, false);
    }
  }

  // Update Todo By Id
  @Put(':id')
  @HttpCode(200)
  async TodoUpdate(
    @Param() id: string,
    @Body() todoDto: TodoDto,
  ): Promise<SuccessResponse<any> | ErrorResponse> {
    try {
      const data = await this.todoService.TodoUpdate(id, todoDto);
      return new SuccessResponse(data, true);
    } catch (error) {
      console.log(error);
      return new ErrorResponse('Internal Server Error', 500, false);
    }
  }

  // Delete Todo
  @Delete(':id')
  @HttpCode(200)
  async TodoDelete(
    @Param() id: string,
  ): Promise<SuccessResponse<any> | ErrorResponse> {
    try {
      const data = await this.todoService.TodoDelete(id);
      return new SuccessResponse(data, true);
    } catch (error) {
      console.log(error);
      return new ErrorResponse('Internal Server Error', 500, false);
    }
  }

  // is completed
  @Patch(':id')
  @HttpCode(200)
  async TodoIsCompleted(
    @Param() id: string,
  ): Promise<SuccessResponse<any> | ErrorResponse> {
    try {
      console.log('id', id);
      const data = await this.todoService.TodoIsCompleted(id);
      return new SuccessResponse(data, true);
    } catch (error) {
      console.log(error);
      return new ErrorResponse('Internal Server Error', 500, false);
    }
  }
}
