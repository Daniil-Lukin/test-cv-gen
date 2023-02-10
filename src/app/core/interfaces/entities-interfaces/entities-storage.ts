import { BehaviorSubject } from "rxjs"
import { EntityData } from "./entity-data";

export interface EntitiesStorage {
  skills: BehaviorSubject<EntityData[]>;
  languages: BehaviorSubject<EntityData[]>;
  responsibilities: BehaviorSubject<EntityData[]>;
}
