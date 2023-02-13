import { UserInfo } from "src/app/core/interfaces/user-info";

export interface AuthResponse {
  jwt: string,
  user: UserInfo,
}
