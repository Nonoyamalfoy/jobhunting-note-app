import { reducerWithInitialState } from "typescript-fsa-reducers";
import { User } from "../../entity/user";
import usersActions from "./actions";

const init: User = {
  isSignedIn: false,
  role: "",
  uid: "",
  username: "",
  strengths: "",
  weaknesses: "",
  experiences: [],
  toDoList: [],
  schedules: [],
  companies: [],
  bestWorks: [],
};

const userReducer = reducerWithInitialState(init)
  .case(usersActions.fetchExperiencesAction, (state, payload) => ({
    ...state,
    experiences: [...payload],
  }))
  .case(usersActions.fetchToDoListAction, (state, payload) => ({
    ...state,
    toDoList: [...payload],
  }))
  .case(usersActions.fetchSchedulesAction, (state, payload) => ({
    ...state,
    schedules: [...payload],
  }))
  .case(usersActions.fetchCompaniesAction, (state, payload) => ({
    ...state,
    companies: [...payload],
  }))
  .case(usersActions.fetchBestWorksAction, (state, payload) => ({
    ...state,
    bestWorks: [...payload],
  }))
  .case(usersActions.setStrengthsAndWeaknesses, (state, payload) => ({
    ...state,
    ...payload,
  }))
  .case(usersActions.signInAction, (state, payload) => ({
    ...state,
    ...payload,
  }))
  .case(usersActions.signOutAction, (state, payload) => ({
    ...payload,
  }));

export default userReducer;
