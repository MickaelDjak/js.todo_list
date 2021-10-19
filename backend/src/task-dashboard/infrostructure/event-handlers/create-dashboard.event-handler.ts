import {EventsHandler, IEventHandler} from "@nestjs/cqrs";
import {DashboardCreatedEvent} from "../../domain/events";

@EventsHandler(DashboardCreatedEvent)
export class DashboardCreatedEventHandler implements IEventHandler<DashboardCreatedEvent> {
    handle(event: DashboardCreatedEvent) {

        console.log(event);
    }
}
