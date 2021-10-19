import {DashboardCreatedEvent}  from './dashboard-created.event';
import {DashboardRenamedEvent} from './dashboard-renamed.event';
import {DashboardArchivedEvent} from './dashboard-archived.event';
import {DashboardUnarchivedEvent} from './dashboard-unarchived.event';

export * from './dashboard-created.event';
export * from './dashboard-renamed.event';
export * from './dashboard-archived.event';
export * from './dashboard-unarchived.event';
export const EventHandler = [
    DashboardCreatedEvent,
    DashboardRenamedEvent,
    DashboardArchivedEvent,
    DashboardUnarchivedEvent
]
