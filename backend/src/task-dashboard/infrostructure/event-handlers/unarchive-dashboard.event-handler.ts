import {EventsHandler, IEventHandler} from "@nestjs/cqrs";
import {DashboardUnarchivedEvent} from "../../domain/events";

@EventsHandler(DashboardUnarchivedEvent)
export class DashboardUnarchivedEventHandler implements IEventHandler<DashboardUnarchivedEvent> {
    handle(event: DashboardUnarchivedEvent) {
        console.log(event);
    }
}
