import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, ListItem } from "@material-ui/core";
import { ScheduleBar } from "./";
import dayjs from "dayjs";
import { isSameMonth, isFirstDay, isSameDay } from "../../lib/calendar";
import { useSelector } from "react-redux";
import { Schedule } from "../../type/user";
import { getCurrentDate } from "../../reducks/calendar/selector";
import { RootState } from "../../type/rootState";

const useStyles = makeStyles({
  element: {
    display: "inline-block",
    borderRight: "1px solid #ccc",
    borderBottom: "1px solid #ccc",
    padding: 0,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
  },
  date: {
    padding: "3.5px 0",
    fontSize: "13px",
  },
  today: {
    display: "inline-block",
    lignHeight: "28px",
    width: "28px",
    backgroundColor: "#ccc",
    borderRadius: "50%",
  },
  currentDate: {
    display: "inline-block",
    lignHeight: "28px",
    width: "28px",
    backgroundColor: "#000088",
    color: "#fff",
    borderRadius: "50%",
  },
  schedules: {
    overflow: "scroll",
    height: "calc(15vh - 40px)",
    pointerEvents: "none",
  },
});

type Props = {
  date: dayjs.Dayjs;
  schedules: Schedule[];
};

const CalendarElement: React.FC<Props> = ({date, schedules}) => {
  const classes = useStyles();
  const selector = useSelector((state: RootState) => state);
  const currentDate = getCurrentDate(selector);
  const today = dayjs();
  const format = isFirstDay(date) ? "M/D" : "D";
  const isCurrentMonth = isSameMonth(date, currentDate)
    ? "textPrimary"
    : "textSecondary";

  let dateStyle = "";
  if (isSameDay(date, currentDate)) {
    dateStyle = classes.currentDate;
  } else if (isSameDay(date, today)) {
    dateStyle = classes.today;
  }
  

  return (
    <ListItem button className={classes.element}>
      <Typography
        className={classes.date}
        color={isCurrentMonth}
        align="center"
        variant="caption"
        component="div"
      >
        <span className={dateStyle}>{date.format(format)}</span>
      </Typography>
      <div className={classes.schedules}>
        {schedules.map((schedule, i) => (
          <ScheduleBar
            key={schedule.scheduleId}
            schedule={schedule}
          />
        ))}
      </div>
    </ListItem>
  );
};

export default CalendarElement;
