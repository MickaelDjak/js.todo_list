import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {DashboardModule} from "./task-dashboard/dashboard.module";
import {SharedModule} from "./shared/shared.module";

@Module({
  imports: [
      SharedModule,
      DashboardModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
