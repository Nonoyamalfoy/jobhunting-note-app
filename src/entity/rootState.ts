import { User } from "./user";
import { Calendar } from "./calendar";
import { RouterState } from "connected-react-router";

export type RootState = {
  user: User;
  calendar: Calendar;
  router: RouterState;
};
