import {GetDashboardQueryHandler} from './get-dashboard.query';
import {GetDashboardsQueryHandler} from './get-dashboards.query';

export * from './get-dashboard.query';
export * from './get-dashboards.query';
export const DashboardQueries = [
    GetDashboardQueryHandler,
    GetDashboardsQueryHandler
]
