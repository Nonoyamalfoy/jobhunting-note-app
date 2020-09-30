import { createSelector } from "reselect";
import { RootState } from "../../entity/rootState";

const calendarSelector = (state: RootState) => state.calendar;

export const getCurrentDate = createSelector(
  [calendarSelector],
  (state) => state.currentDate
);
