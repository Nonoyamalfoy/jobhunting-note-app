import actionCreatorFactory from "typescript-fsa";
import { User } from "../../domain/entity/user";

const actionCreator = actionCreatorFactory();

const usersActions = {
  signInAction: actionCreator<User>("SIGNIN_ACTION"),
  signOutAction: actionCreator<User>("SIGNOUT_ACTION"),
};

export default usersActions;
