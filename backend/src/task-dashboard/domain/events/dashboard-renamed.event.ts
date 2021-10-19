import {Id} from "../../../shared/types/id.generator";

export class DashboardRenamedEvent {
    public constructor(
        public id: Id,
        public name: string
    ) {}
}
