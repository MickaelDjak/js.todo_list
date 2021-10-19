import {v4 as uuid} from 'uuid';
import {Id, IdGenerator} from "../types/id.generator";
import {Injectable} from "@nestjs/common";

@Injectable()
export class UUIDGenerator extends IdGenerator {
    public generateId(): Id {
        return uuid();
    }
}
