import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {Id} from "../../../shared/types/id.generator";
import {DashboardFactory} from "../../domain/model/dashboard.factory";
import {DashboardPersistRepository} from "../../domain/model/dashboard.interface";

export class RenameDashboardCommand {
    constructor(
        public readonly dashboardId: Id,
        public readonly name: string
    ) {}
}

@CommandHandler(RenameDashboardCommand)
export class RenameDashboardCommandHandler implements ICommandHandler<RenameDashboardCommand> {
    constructor(
        private dashboardFactory: DashboardFactory,
        private persistRepository: DashboardPersistRepository
    ) {}

    async execute({dashboardId, name}: RenameDashboardCommand): Promise<void> {
        const dashboard = await this.persistRepository.getOneByIdOrFailed(dashboardId);
        dashboard.rename(name);
        await this.persistRepository.save(dashboard);
    }
}
