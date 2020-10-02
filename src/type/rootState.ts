import { User } from "./user";
import { Calendar } from "./calendar";
import { RouterState } from "connected-react-router";
import { Loading } from "./loading";

export type RootState = {
  user: User;
  calendar: Calendar;
  loading: Loading;
  router: RouterState;
};
