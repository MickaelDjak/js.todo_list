import {Injectable} from "@nestjs/common";
import {ICommand, ofType, Saga} from "@nestjs/cqrs";
import {DashboardArchivedEvent, DashboardCreatedEvent, DashboardRenamedEvent} from "../../domain/events";
import {map, Observable} from "rxjs";
import {PassToClientCommand} from "../commands";

@Injectable()
export class DashboardSaga {
    @Saga()
    DashboardRenamedEvent = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(DashboardRenamedEvent),
            map((event: any) =>  new PassToClientCommand(event.constructor.name, event))
        );
    }

    @Saga()
    DashboardCreatedEvent = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(DashboardCreatedEvent,),
            map((event: any) =>  new PassToClientCommand(event.constructor.name, event))
        );
    }

    @Saga()
    DashboardArchivedEvent = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(DashboardArchivedEvent),
            map((event: any) =>  new PassToClientCommand(event.constructor.name, event))
        );
    }
}
