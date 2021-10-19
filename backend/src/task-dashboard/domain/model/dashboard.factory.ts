import {Id, IdGenerator} from "../../../shared/types/id.generator";
import {DashboardModel} from "./dashboard.model";
import {IEvent} from "../../../shared/types/aggregate.interface";
import {EventPublisher} from "@nestjs/cqrs";
import {Injectable} from "@nestjs/common";

@Injectable()
export class DashboardFactory {

    public constructor(
        private idGenerator: IdGenerator,
        private publisher: EventPublisher
    ) {}

    public new(): DashboardModel {
        // @ts-ignore
        const object = new DashboardModel()
        this.publisher.mergeObjectContext(object);

        return object;
    }

    public recreate(item: any): DashboardModel {
        // @ts-ignore
        const object = new DashboardModel()
        this.publisher.mergeObjectContext(object);
        // @ts-ignore
        object._id = item.id;
        // @ts-ignore
        object.name = item.name;
        // @ts-ignore
        object.status = item.status;


        return object;
    }

    public create(name, id = null): DashboardModel {
        const modelId = id || this.idGenerator.generateId();
        // @ts-ignore
        const object = new DashboardModel()
        object.create(modelId, name);
        this.publisher.mergeObjectContext(object);

        return object;
    }

    public restore(id: Id, events: IEvent[]): DashboardModel {
        // @ts-ignore
        const object = new DashboardModel()
        this.publisher.mergeObjectContext(object);
        object.loadFromHistory(events);

        return object;
    }

}
