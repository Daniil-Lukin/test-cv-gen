import { EntityData } from "../../entities/interfaces/entity-data";

export interface ProjectsToGetData {
    id: number;
    attributes: {
      name: string;
      description: string;
      from: Date; //"YYYY-MM-DD",
      to: Date; //"YYYY-MM-DD"
      domain: string;
      skills: EntityData[];
      internalName: string;
    }
}
