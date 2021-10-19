import { DashboardCreatedEventHandler }  from './create-dashboard.event-handler';
import { DashboardRenamedEventHandler }  from './rename-dashboard.event-handler';
import { DashboardArchivedEventHandler }  from './archive-dashboard.event-handler';
import { DashboardUnarchivedEventHandler }  from './unarchive-dashboard.event-handler';

export * from './create-dashboard.event-handler';
export * from './rename-dashboard.event-handler';
export * from './archive-dashboard.event-handler';
export * from './unarchive-dashboard.event-handler';
export const DashboardEventHandler = [
    DashboardCreatedEventHandler,
    DashboardRenamedEventHandler,
    DashboardArchivedEventHandler,
    DashboardUnarchivedEventHandler
]
