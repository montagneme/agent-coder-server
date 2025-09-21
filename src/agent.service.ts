import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { agent } from './utils/mockAgent';

@WebSocketGateway({ namespace: '/chat', cors: true })
export default class AgentGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('WebSocket 网关已初始化');
  }

  handleConnection(client: Socket) {
    console.log(`客户端连接: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`客户端断开: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(
    client: Socket,
    payload: { text: string; dialogueIndex: number },
  ) {
    console.log('收到消息', payload);
    const { code = '', css = '' } = agent[payload.text] || {};
    client.emit('message', {
      dialogueIndex: payload.dialogueIndex,
      message: '生成完毕',
      code,
      css,
    });
  }
}
