import {Id} from "../../../shared/types/id.generator";
import {DashboardStatuses} from "../model/dashboard.constants";

export class DashboardCreatedEvent {
    public constructor(
        public id: Id,
        public status: DashboardStatuses.ACTIVE,
        public name: string
    ) {}
}
