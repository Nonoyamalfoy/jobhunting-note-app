import dayjs from "dayjs";
import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory();

const calendarActions = {
  setDateAction: actionCreator<dayjs.Dayjs>("SET_DATE_ACTION"),
}

export default calendarActions