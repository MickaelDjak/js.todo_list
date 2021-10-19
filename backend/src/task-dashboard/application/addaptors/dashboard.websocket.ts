import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import {CommandBus} from "@nestjs/cqrs";
import {
    ArchiveDashboardCommand,
    CreateDashboardCommand,
    RenameDashboardCommand,
    UnarchiveDashboardCommand
} from "../commands";
import {Param, Post} from "@nestjs/common";

@WebSocketGateway({ cors: {} })
export class DashboardWebsocket {

    @WebSocketServer()
    server: Server;

    constructor(
        private commandBus: CommandBus
    ) {}

    @SubscribeMessage('dashboard/create')
    async createDashboard(@MessageBody() { name }): Promise<any> {
        await this.commandBus.execute(new CreateDashboardCommand(name))
    }

    @SubscribeMessage('dashboard/rename')
    async renameDashboard(@MessageBody() { id, name }): Promise<any> {
        await this.commandBus.execute(new RenameDashboardCommand(id, name))
    }

    @SubscribeMessage('dashboard/archive')
    async archiveDashboard(
        @MessageBody() { id }
    ): Promise<string> {
        return this.commandBus.execute(new ArchiveDashboardCommand(id));
    }

    @Post('dashboard/unarchive')
    async unarchiveDashboard(
        @MessageBody() { id }
    ): Promise<string> {
        return this.commandBus.execute(new UnarchiveDashboardCommand(id));
    }
}
