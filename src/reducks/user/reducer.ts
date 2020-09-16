import { reducerWithInitialState } from "typescript-fsa-reducers";
import { User } from "../../domain/entity/user";
import usersActions from "./actions";

const init: User = {
  isSignedIn: false,
  role: "",
  uid: "",
  username: "",
};

const userReducer = reducerWithInitialState(init)
  .case(usersActions.signInAction, (state, payload) => ({
    ...state,
    ...payload,
  }))
  .case(usersActions.signOutAction, (state, payload) => ({
    ...payload,
  }));

  export default userReducer
