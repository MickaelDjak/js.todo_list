import {EventsHandler, IEventHandler} from "@nestjs/cqrs";
import {DashboardArchivedEvent} from "../../domain/events";

@EventsHandler(DashboardArchivedEvent)
export class DashboardArchivedEventHandler implements IEventHandler<DashboardArchivedEvent> {
    handle(event: DashboardArchivedEvent) {
        console.log(event);
    }
}
