import {EventsHandler, IEventHandler} from "@nestjs/cqrs";
import {DashboardRenamedEvent} from "../../domain/events";

@EventsHandler(DashboardRenamedEvent)
export class DashboardRenamedEventHandler implements IEventHandler<DashboardRenamedEvent> {
    handle(event: DashboardRenamedEvent) {
        console.log(event);
    }
}
