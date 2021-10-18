import {io} from "socket.io-client";
import {baseUrl} from "./service.const";

export class WebSocketService {

    constructor() {
        this.socket = io(baseUrl);
        this.socket.on("connect", () => {
            console.log('web socket connected');
        });

        this.socket.on("disconnect", () => {
            console.log('web socket disconnect');
        });
    }

    listenOn(eventName, handler){
        this.socket.on(eventName, handler);
    }

    emit(eventName, payload){
        this.socket.emit(eventName, payload);
    }
}
