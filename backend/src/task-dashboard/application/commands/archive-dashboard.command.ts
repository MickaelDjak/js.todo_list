import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {Id} from "../../../shared/types/id.generator";
import {DashboardFactory} from "../../domain/model/dashboard.factory";
import {DashboardPersistRepository} from "../../domain/model/dashboard.interface";

export class ArchiveDashboardCommand {
    constructor(
        public readonly dashboardId: Id
    ) {}
}

@CommandHandler(ArchiveDashboardCommand)
export class ArchiveDashboardCommandHandler implements ICommandHandler<ArchiveDashboardCommand> {
    constructor(
        private dashboardFactory: DashboardFactory,
        private persistRepository: DashboardPersistRepository,
    ) {}

    async execute({ dashboardId }: ArchiveDashboardCommand): Promise<void> {
        const dashboard = await this.persistRepository.getOneByIdOrFailed(dashboardId);
        dashboard.archive();
        await this.persistRepository.save(dashboard);
    }
}
