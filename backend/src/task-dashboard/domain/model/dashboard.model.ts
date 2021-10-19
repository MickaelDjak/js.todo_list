import {DashboardArchivedEvent, DashboardCreatedEvent, DashboardUnarchivedEvent, DashboardRenamedEvent} from "../events";
import {Id} from "../../../shared/types/id.generator";
import {Aggregate} from "../../../shared/impl/aggregate";
import {DashboardStatuses} from "./dashboard.constants";
import {BusinessLogicError} from "../../../shared/errors";

export class DashboardModel extends Aggregate {
    private name: string
    private status: DashboardStatuses;

    private constructor() {
        super();
    }

    // public static create(name: string, idGenerator: IdGenerator): DashboardModel {
    //     const id = '2';
    //     const dashboard = new DashboardModel()
    //     dashboard.create(id, name);
    //
    //     return dashboard;
    // }

    public create(id: Id, name: string): void {
        this.apply(new DashboardCreatedEvent(id, DashboardStatuses.ACTIVE, name));
    }

    public onDashboardCreatedEvent({id, status, name}: DashboardCreatedEvent): void {
        this._id = id;
        this.status = status;
        this.name = name;
    }

    public rename(name) {
        if (this.status === DashboardStatuses.ARCHIVED){
            throw new Error('Can rename only active dashboard');
        }

        this.apply(new DashboardRenamedEvent(this.id, name));
    }

    public onDashboardRenamedEvent({name}: DashboardRenamedEvent): void {
        this.name = name;
    }

    public archive(): void {
        if (this.status === DashboardStatuses.ARCHIVED) {
            throw new BusinessLogicError('You can archive already archived dashboard');
        }
        this.apply(new DashboardArchivedEvent(this.id, DashboardStatuses.ARCHIVED));
    }

    public onDashboardArchivedEvent({status}: DashboardArchivedEvent): void {
        this.status = status;
    }

    public unarchive(): void {
        if (this.status === DashboardStatuses.ACTIVE) {
            throw new BusinessLogicError('You can unarchive active dashboard');
        }
        this.apply(new DashboardUnarchivedEvent(this.id, DashboardStatuses.ACTIVE));
    }

    public onDashboardUnarchivedEvent({status}: DashboardUnarchivedEvent): void {
        this.status = status;
    }
}
