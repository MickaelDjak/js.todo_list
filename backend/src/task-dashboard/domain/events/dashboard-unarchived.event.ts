import {Id} from "../../../shared/types/id.generator";
import {DashboardStatuses} from "../model/dashboard.constants";

export class DashboardUnarchivedEvent {
    public constructor(
        public id: Id,
        public status: DashboardStatuses.ACTIVE
    ) {}
}
