import React, { useState } from "react";
import { GridList, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CalendarElement from "./CalendarElement";
import { createCalendar } from "../../lib/calendar";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import { getSchedules } from "../../reducks/user/selectors";
import { RootState } from "../../type/rootState";
import { Schedule } from "../../type/user";
import { getCurrentDate } from "../../reducks/calendar/selector";
import { setCurrentDate } from "../../reducks/calendar/operations";

const useStyles = makeStyles({
  grid: {
    borderLeft: "1px solid #ccc",
    borderTop: "1px solid #ccc",
  },
  days: {
    borderRight: "1px solid #ccc",
    paddingTop: "5px",
    color: "black",
  },
});

const setSchedules = (calendar: dayjs.Dayjs[], schedules: Schedule[]) => {
  // if(schedules) {
  return calendar.map((c) => ({
    date: c,
    schedules: schedules.filter(
      (e) => dayjs(e.date).format("YYYYMMDD") === c.format("YYYYMMDD")
    ),
  }));
  // }
};

const days = ["日", "月", "火", "水", "木", "金", "土"];

type Props = {
  handleClickOpenSelectedScheduleDialog: (s: Schedule) => void;
};

const CalendarBoard: React.FC<Props> = (props) => {
  const classes = useStyles();
  // const [currentDate, setCurrentDate] = useState(dayjs());
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const schedules = getSchedules(selector);
  const currentDate = getCurrentDate(selector);
  const calendar = setSchedules(createCalendar(currentDate), schedules);
  // const calendar = createCalendar(currentDate);

  return (
    <div>
      <GridList
        className={classes.grid}
        cols={7}
        spacing={0}
        cellHeight={"auto"}
      >
        {days.map((d) => (
          <li key={d}>
            <Typography
              className={classes.days}
              align="center"
              variant="caption"
              component="div"
            >
              {d}
            </Typography>
          </li>
        ))}
        {calendar.map(({ date, schedules }) => (
          <li
            key={date.toISOString()}
            onClick={() => dispatch(setCurrentDate(date))}
          >
            <CalendarElement
              handleClickOpenSelectedScheduleDialog={
                props.handleClickOpenSelectedScheduleDialog
              }
              date={date}
              currentDate={currentDate}
              schedules={schedules}
            />
          </li>
        ))}
      </GridList>
    </div>
  );
};

export default CalendarBoard;
