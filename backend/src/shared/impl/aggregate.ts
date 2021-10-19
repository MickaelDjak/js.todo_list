import { AggregateInterface } from "../types/aggregate.interface";
import {AggregateRoot} from "@nestjs/cqrs";
import {Id} from "../types/id.generator";

export class Aggregate extends AggregateRoot implements AggregateInterface {
    protected _id: Id;

    get id() {
        return this._id;
    }
}
