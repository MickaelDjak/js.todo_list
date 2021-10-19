import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Server} from "socket.io";

export class PassToClientCommand {
    constructor(
        public readonly eventName: string,
        public readonly eventPayload: any,
    ) {}
}

@WebSocketGateway({ cors: {} })
@CommandHandler(PassToClientCommand)
export class PassToClientCommandHandler implements ICommandHandler<PassToClientCommand> {

    @WebSocketServer()
    server: Server;

    async execute({ eventName, eventPayload }: PassToClientCommand): Promise<void> {
        this.server.emit(eventName, eventPayload)
    }
}
