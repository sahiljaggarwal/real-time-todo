import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SuccessResponse } from 'src/common/SuccessResponse';

@WebSocketGateway({namespace: '/todo-events'})
export class TodoGateway {
  @WebSocketServer() server:Server

  @SubscribeMessage('todoCreated')
  handleTodoCreated(client: any, payload: any):void{
    this.server.emit('todoCreated', payload)
  }

  @SubscribeMessage('todoList')
  handleTodoList(client:any, payload:any):void{
    this.server.emit('todoList', payload)
  }

  @SubscribeMessage('todoListById')
  handleTodoListById(client:any, payload:any):void{
    this.server.emit('todoListById', payload)
  }

  @SubscribeMessage('todoUpdate')
  handleTodoUpdate(client:any, payload:any):void{
    this.server.emit('todoUpdate', payload)
  }

  @SubscribeMessage('todoDelete')
  handleTodoDelete(client:any, payload:any):void{
    this.server.emit('todoDelete', payload)
  }

  @SubscribeMessage('todoIsComplete')
  handleTodoIsComplete(client:any, payload:any):void{
    this.server.emit('todoIsComplete', payload)
  }
}
