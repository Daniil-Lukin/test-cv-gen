import { UserInfo } from "src/app/modules/shared/interfaces/user-info";

export interface AuthResponse {
  jwt: string,
  user: UserInfo,
}
