import {createSelector} from "reselect";
import { RootState } from "../../entity/rootState";

const userSelector = (state: RootState) => state.user;

export const getIsSignedIn = createSelector(
  [userSelector],
  (state) => state.isSignedIn
)