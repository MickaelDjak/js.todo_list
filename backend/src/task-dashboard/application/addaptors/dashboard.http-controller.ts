import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {GetDashboardQuery, GetDashboardsQuery} from "../queries";
import {
    ArchiveDashboardCommand,
    CreateDashboardCommand,
    RenameDashboardCommand,
    UnarchiveDashboardCommand
} from "../commands";

@Controller('dashboard')
export class DashboardHttpController {

    constructor(
        private queryBus: QueryBus,
        private commandBus: CommandBus,
    ) {
    }

    @Get('/')
    async getDashboards(): Promise<string> {
        return this.queryBus.execute(new GetDashboardsQuery());
    }

    @Get('/:dashboardId')
    async getDashboard(
        @Param(':dashboardId') dashboardId
    ): Promise<string> {
        return this.queryBus.execute(new GetDashboardQuery(dashboardId));
    }

    @Post('/:dashboard/create')
    async createDashboard(
        @Body(':name') name
    ): Promise<string> {
        return this.commandBus.execute(new CreateDashboardCommand(name));
    }

    @Post('/:dashboard/rename/:dashboardId')
    async renameDashboard(
        @Param(':dashboardId') dashboardId,
        @Body(':name') name
    ): Promise<string> {
        return this.commandBus.execute(new RenameDashboardCommand(dashboardId, name));
    }

    @Post('/:dashboard/archive/:dashboardId')
    async archiveDashboard(
        @Param(':dashboardId') dashboardId,
    ): Promise<string> {
        return this.commandBus.execute(new ArchiveDashboardCommand(dashboardId));
    }

    @Post('/:dashboard/unarchive/:dashboardId')
    async unarchiveDashboard(
        @Param(':dashboardId') dashboardId,
    ): Promise<string> {
        return this.commandBus.execute(new UnarchiveDashboardCommand(dashboardId));
    }
}
