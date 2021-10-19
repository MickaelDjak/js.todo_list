import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {DashboardModel} from "../../domain/model/dashboard.model";
import {Id} from "../../../shared/types/id.generator";
import {DashboardPersistRepository} from "../../domain/model/dashboard.interface";

export class GetDashboardQuery {
    constructor(
        public dashboardId: Id
    ) {}
}

@QueryHandler(GetDashboardQuery)
export class GetDashboardQueryHandler implements IQueryHandler<GetDashboardQuery> {
    constructor(
        private persistRepository: DashboardPersistRepository
    ) {}

    public async execute({ dashboardId }: GetDashboardQuery): Promise<DashboardModel> {
        return await this.persistRepository.getOneByIdOrFailed(dashboardId);
    }
}
