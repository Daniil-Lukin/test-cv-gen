import { EntityData } from "./entity-data";
import { ResponsePagination } from "./response-pagination";

export interface SkillsResponse {
  data: EntityData[];
  meta?: {
    pagination: ResponsePagination;
  }
}
