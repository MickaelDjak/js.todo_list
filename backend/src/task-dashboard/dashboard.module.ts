import { Module } from '@nestjs/common';
import {DashboardHttpController} from "./application/addaptors/dashboard.http-controller";
import {DashboardFactory} from "./domain/model/dashboard.factory";
import {CqrsModule} from "@nestjs/cqrs";
import {
  DashboardPersistRepository
} from "./domain/model/dashboard.interface";
import {DashboardQueries} from "./application/queries";
import {DashboardCommands} from "./application/commands";
import {SharedModule} from "../shared/shared.module";
import {DashboardEventHandler} from "./infrostructure/event-handlers";
import {DashboardWebsocket} from "./application/addaptors/dashboard.websocket";
import {DashboardSaga} from "./application/addaptors/dashboard.saga";
import {MongooseModule} from "@nestjs/mongoose";
import {InmemoryDashboardPersistRepository} from "./persistence/inmemory-dashboard-persist.repository";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin:rootpass@mongodb'),
    CqrsModule,
    SharedModule
  ],
  controllers: [DashboardHttpController],
  providers: [
    DashboardWebsocket,
    DashboardSaga,
    DashboardFactory,
    { provide: DashboardPersistRepository, useClass: InmemoryDashboardPersistRepository },
    ...DashboardCommands,
    ...DashboardQueries,
    ...DashboardEventHandler,
  ],
})
export class DashboardModule {}
