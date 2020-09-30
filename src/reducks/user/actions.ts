import actionCreatorFactory from "typescript-fsa";
import { Company } from "../../entity/company";
import {
  AuthUser,
  BestWork,
  Experience,
  Schedule,
  ToDo,
  User,
  StrengthsAndWeaknesses,
} from "../../entity/user";

const actionCreator = actionCreatorFactory();

const usersActions = {
  fetchExperiencesAction: actionCreator<Experience[]>(
    "FETCH_EXPERIENCES_ACTION"
  ),
  fetchToDoListAction: actionCreator<ToDo[]>("FETCH_TODOLIST_ACTION"),
  fetchSchedulesAction: actionCreator<Schedule[]>("FETCH_SCHEDULES_ACTION"),
  fetchCompaniesAction: actionCreator<Company[]>("FETCH_COMPANIES_ACTION"),
  fetchBestWorksAction: actionCreator<BestWork[]>("FETCH_BESTWORKS_ACTION"),
  setStrengthsAndWeaknesses: actionCreator<StrengthsAndWeaknesses>(
    "SET_STRENGTHS_AND_WEAKNESSES"
  ),
  signInAction: actionCreator<AuthUser>("SIGNIN_ACTION"),
  signOutAction: actionCreator<User>("SIGNOUT_ACTION"),
};

export default usersActions;
