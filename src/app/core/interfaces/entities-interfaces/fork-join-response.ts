import { Entities } from "../enums/entities.enum";
import { EntityData } from "./entity-data";

export type ForkJoinResponse = {
  [key in Entities]?: EntityData[];
}
