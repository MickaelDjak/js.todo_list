import {Id} from "./id.generator";

export interface IEvent {}

export interface AggregateInterface {
    loadFromHistory(history: IEvent[]): void;
    apply<T extends IEvent>(event: T, isFromHistory?: boolean): void;
}
