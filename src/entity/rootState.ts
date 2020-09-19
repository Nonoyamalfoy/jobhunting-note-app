import { User } from "./user";
import { RouterState } from "connected-react-router";

export type RootState = {
  user: User;
  router: RouterState
};
