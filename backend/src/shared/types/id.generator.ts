export type Id  = string;

export abstract class IdGenerator {
   abstract generateId(): Id;
}
