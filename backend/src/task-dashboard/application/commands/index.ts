import {PassToClientCommandHandler} from './pass-to-client.command';
import {CreateDashboardCommandHandler} from './create-dashboard.command';
import {RenameDashboardCommandHandler} from './rename-dashboard.command';
import {ArchiveDashboardCommandHandler} from './archive-dashboard.command';
import {UnarchiveDashboardCommandHandler} from './unarchive-dashboard.command';

export * from './pass-to-client.command';
export * from './create-dashboard.command';
export * from './rename-dashboard.command';
export * from './archive-dashboard.command';
export * from './unarchive-dashboard.command';
export const DashboardCommands = [
    PassToClientCommandHandler,
    CreateDashboardCommandHandler,
    RenameDashboardCommandHandler,
    ArchiveDashboardCommandHandler,
    UnarchiveDashboardCommandHandler,
]
