import { createSelector } from "reselect";
import { RootState } from "../../type/rootState";

const userSelector = (state: RootState) => state.user;

export const getUserId = createSelector([userSelector], (state) => state.uid);

export const getIsSignedIn = createSelector(
  [userSelector],
  (state) => state.isSignedIn
);

export const getStrengths = createSelector(
  [userSelector],
  (state) => state.strengths
);

export const getWeaknesses = createSelector(
  [userSelector],
  (state) => state.weaknesses
);

export const getExperiences = createSelector(
  [userSelector],
  (state) => state.experiences
);

export const getToDoList = createSelector(
  [userSelector],
  (state) => state.toDoList
);

export const getSchedules = createSelector(
  [userSelector],
  (state) => state.schedules
);

export const getCompanies = createSelector(
  [userSelector],
  (state) => state.companies
);

export const getBestWorks = createSelector(
  [userSelector],
  (state) => state.bestWorks
);
