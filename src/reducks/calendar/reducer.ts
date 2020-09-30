import { reducerWithInitialState } from "typescript-fsa-reducers";
import calendarAction from "./actions";
import { Calendar } from "../../entity/calendar";
import dayjs from "dayjs";

const init: Calendar = {
  currentDate: dayjs(),
};

const CalendarReducer = reducerWithInitialState(init).case(
  calendarAction.setDateAction,
  (state, payload) => ({
    ...state,
    currentDate: payload,
  })
);

export default CalendarReducer;
