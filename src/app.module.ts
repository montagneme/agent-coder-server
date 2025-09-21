import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import AgentGateway from './agent.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AgentGateway],
})
export class AppModule {}
