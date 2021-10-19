import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {DashboardModel} from "../../domain/model/dashboard.model";
import {DashboardPersistRepository} from "../../domain/model/dashboard.interface";

export class GetDashboardsQuery {}

@QueryHandler(GetDashboardsQuery)
export class GetDashboardsQueryHandler implements IQueryHandler<GetDashboardsQuery> {
    constructor(
        private persistRepository: DashboardPersistRepository
    ) {}

    public async execute(): Promise<DashboardModel[]> {
        return await this.persistRepository.getAll();
    }
}
