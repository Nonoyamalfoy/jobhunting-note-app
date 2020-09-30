import dayjs from "dayjs";
import { Dispatch } from "redux";
import calendarActions from "./actions";

export const setCurrentDate = (date: dayjs.Dayjs) => {
  return async (dispatch: Dispatch) => {
    dispatch(calendarActions.setDateAction(date))
  }
}