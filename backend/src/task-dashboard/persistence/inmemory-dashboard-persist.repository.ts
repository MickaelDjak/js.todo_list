import {DashboardPersistRepository} from "../domain/model/dashboard.interface";
import {DashboardModel} from "../domain/model/dashboard.model";
import {Injectable} from "@nestjs/common";
import {DashboardFactory} from "../domain/model/dashboard.factory";
import {Id} from "../../shared/types/id.generator";

const data = [
    {
        id: "e440b1ca-9766-4719-9eb0-c15b45734b65",
        status: "ACTIVE",
        name: "step 1"
    },
    {
        id: "decaed76-ee60-48a1-a008-0ef0cbb20884",
        status: "ACTIVE",
        name: "next step 2"
    },
    {
        id: "b11e6d44-cce9-48c1-8097-517bbc8597a7",
        status: "ACTIVE",
        name: "next step 3"
    },
    {
        id: "b9478a6e-4dbd-42ca-8cb9-603272ba54a3",
        status: "ARCHIVED",
        name: "last step 4"
    }
]


@Injectable()
export class InmemoryDashboardPersistRepository extends DashboardPersistRepository {
    constructor(
        private dashboardFactory: DashboardFactory
    ) {
        super();
    }

    public getAll(): Promise<DashboardModel[]> {
        const list = data.map((item) => {
            return this.dashboardFactory.recreate(item);
        })
        return Promise.resolve(list);
    }

    public getOneById(id: Id): Promise<DashboardModel | null> {
        const item = data.find((el) =>  el.id === id);
        const dashboard = this.dashboardFactory.recreate(item);
        return Promise.resolve(dashboard);
    }

    public getOneByIdOrFailed(id: Id): Promise<DashboardModel> {
        const item = data.find((el) =>  el.id === id);
        const dashboard = this.dashboardFactory.recreate(item);
        return Promise.resolve(dashboard);
    }

    save(dashboard: DashboardModel): Promise<void> {
        const index = data.findIndex((el) =>  el.id === dashboard.id);
        if (index === -1) {
            // @ts-ignore
            data.push(dashboard)
        } else {
            // @ts-ignore
            data[index] = dashboard;
        }
        dashboard.commit();

        console.log('model stored', dashboard);
        return Promise.resolve(null);
    }
}
