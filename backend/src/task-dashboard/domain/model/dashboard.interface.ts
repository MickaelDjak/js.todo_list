import {Id} from "../../../shared/types/id.generator";
import {DashboardModel} from "./dashboard.model";

export abstract class DashboardPersistRepository {
    abstract getOneById(id: Id): Promise<DashboardModel | null>;
    abstract getOneByIdOrFailed(id: Id): Promise<DashboardModel>;
    abstract getAll(): Promise<DashboardModel[]>;
    abstract save(dashboardModel: DashboardModel): Promise<void>;
}
