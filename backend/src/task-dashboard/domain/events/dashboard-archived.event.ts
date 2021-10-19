import {Id} from "../../../shared/types/id.generator";
import {DashboardStatuses} from "../model/dashboard.constants";

export class DashboardArchivedEvent {
    public constructor(
        public id: Id,
        public status: DashboardStatuses.ARCHIVED
    ) {}
}
