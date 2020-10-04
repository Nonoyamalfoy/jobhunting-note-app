import { createContext } from "react";
import { Schedule } from "../type/user";

type CalendarContext = {
  handleClickOpenSelectedScheduleDialog: (
    s: Schedule,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  handleClickOpenAddScheduleDialog: (s?: Schedule) => void;
};

const CalendarContext = createContext<CalendarContext>({
  handleClickOpenSelectedScheduleDialog: () => {},
  handleClickOpenAddScheduleDialog: () => {}
});

export default CalendarContext;
