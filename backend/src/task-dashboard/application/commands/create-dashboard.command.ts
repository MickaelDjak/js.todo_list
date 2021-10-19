import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DashboardFactory} from "../../domain/model/dashboard.factory";
import {DashboardPersistRepository} from "../../domain/model/dashboard.interface";

export class CreateDashboardCommand {
    constructor(
        public readonly name: string
    ) {}
}

@CommandHandler(CreateDashboardCommand)
export class CreateDashboardCommandHandler implements ICommandHandler<CreateDashboardCommand> {
    constructor(
        private dashboardFactory: DashboardFactory,
        private persistRepository: DashboardPersistRepository
    ) {}

    async execute({ name }: CreateDashboardCommand): Promise<void> {
        const dashboard = this.dashboardFactory.create(name);
        await this.persistRepository.save(dashboard);
    }
}
