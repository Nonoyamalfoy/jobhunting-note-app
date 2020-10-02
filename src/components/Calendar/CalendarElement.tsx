import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, ListItem } from "@material-ui/core";
import { ScheduleBar } from "./";
import dayjs from "dayjs";
import { isSameMonth, isFirstDay, isSameDay } from "../../lib/calendar";
import { useSelector } from "react-redux";
import { Schedule } from "../../type/user";

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
  },
});

type Props = {
  date: dayjs.Dayjs;
  currentDate: dayjs.Dayjs;
  schedules: Schedule[];
  handleClickOpenSelectedScheduleDialog: (s: Schedule) => void;
};

const CalendarElement: React.FC<Props> = (props) => {
  // console.log(props.schedules);

  const classes = useStyles();
  const selector = useSelector((state) => state);
  const today = dayjs();
  const format = isFirstDay(props.date) ? "M/D" : "D";
  const isCurrentMonth = isSameMonth(props.date, props.currentDate)
    ? "textPrimary"
    : "textSecondary";

  let date = "";
  if (isSameDay(props.date, props.currentDate)) {
    date = classes.currentDate;
  } else if (isSameDay(props.date, today)) {
    date = classes.today;
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
        <span className={date}>{props.date.format(format)}</span>
      </Typography>
      <div className={classes.schedules}>
        {props.schedules.map((schedule, i) => (
          <div key={i} onClick={() => props.handleClickOpenSelectedScheduleDialog(schedule)}>
            <ScheduleBar key={schedule.scheduleId} schedule={schedule} />
          </div>
        ))}
      </div>
    </ListItem>
  );
};

export default CalendarElement;
