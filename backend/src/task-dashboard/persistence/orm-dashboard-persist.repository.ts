import {DashboardPersistRepository} from "../domain/model/dashboard.interface";
import {DashboardModel} from "../domain/model/dashboard.model";
import {Injectable} from "@nestjs/common";
import {Id} from "../../shared/types/id.generator";

@Injectable()
export class OrmDashboardPersistRepository extends DashboardPersistRepository {
    public getAll(): Promise<DashboardModel[]> {
        throw new Error("not implement yet");
    }

    public getOneById(id: Id): Promise<DashboardModel | null> {
        throw new Error("not implement yet");
    }

    public getOneByIdOrFailed(id: Id): Promise<DashboardModel> {
        throw new Error("not implement yet");
    }

    save(dashboard: DashboardModel): Promise<void> {
        throw new Error("not implement yet");
    }
}
