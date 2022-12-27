import { EntityData } from "../../entities/interfaces/entity-data";
import { SkillsResponse } from "../../entities/interfaces/skills-response";

export interface ProjectsToGetData {
    id?: number;
    attributes: {
      name: string;
      description: string;
      from: Date; //"YYYY-MM-DD",
      to: Date; //"YYYY-MM-DD"
      domain: string;
      skills: SkillsResponse;
      internalName: string;
    }
}
