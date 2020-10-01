import dayjs from "dayjs";
import { Dispatch } from "redux";
import calendarActions from "./actions";
import { getNextMonth, getPreviousMonth } from "../../lib/calendar";
import { RootState } from "../../entity/rootState";

export const setNextMonth = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const nextMonth = getNextMonth(getState().calendar.currentDate.format("YYYYMM"));
    dispatch(calendarActions.setDateAction(nextMonth));
  };
};

export const setPreviousMonth = () => {
  return async (dispatch: Dispatch, getState:() => RootState) => {
    const previousMonth = getPreviousMonth(getState().calendar.currentDate.format("YYYYMM"));
    dispatch(calendarActions.setDateAction(previousMonth));
  };
};

export const setCurrentDate = (date: dayjs.Dayjs) => {
  return async (dispatch: Dispatch) => {
    dispatch(calendarActions.setDateAction(date));
  };
};
