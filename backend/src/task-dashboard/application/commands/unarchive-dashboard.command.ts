import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {Id} from "../../../shared/types/id.generator";
import {DashboardFactory} from "../../domain/model/dashboard.factory";
import {DashboardPersistRepository} from "../../domain/model/dashboard.interface";

export class UnarchiveDashboardCommand {
    constructor(
        public readonly dashboardId: Id
    ) {}
}

@CommandHandler(UnarchiveDashboardCommand)
export class UnarchiveDashboardCommandHandler implements ICommandHandler<UnarchiveDashboardCommand> {
    constructor(
        private dashboardFactory: DashboardFactory,
        private persistRepository: DashboardPersistRepository,
    ) {}

    async execute({ dashboardId }: UnarchiveDashboardCommand): Promise<void> {
        const dashboard = await this.persistRepository.getOneByIdOrFailed(dashboardId);
        dashboard.unarchive();
        await this.persistRepository.save(dashboard);
    }
}
