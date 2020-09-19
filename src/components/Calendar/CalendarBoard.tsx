import React, {useState} from "react";
import { GridList, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CalendarElement from "./CalendarElement";
import { createCalendar } from "../../lib/calendar";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";

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

const days = ["日", "月", "火", "水", "木", "金", "土"];

const CalendarBoard: React.FC = () => {
  const classes = useStyles();
  const [currentDate, setCurrentDate] = useState(dayjs());
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const calendar = createCalendar(currentDate);


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
        {calendar.map((date) => (
          <li key={date.toISOString()} onClick={() => setCurrentDate(date)}>
            <CalendarElement date={date} currentDate={currentDate} />
          </li>
        ))}
      </GridList>
    </div>
  );
};

export default CalendarBoard;
