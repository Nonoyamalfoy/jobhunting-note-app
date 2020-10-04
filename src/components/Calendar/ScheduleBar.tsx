import React, { useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import { useDispatch } from "react-redux";
import { Schedule } from "../../type/user";
import { CalendarContext } from "../../contexts";

const useStyles = makeStyles({
  schedule: {
    width: "80%",
    color: "white",
    borderRadius: "4px",
    fontSize: "11px",
    padding: "0 3px",
    margin: "1px 0",
    cursor: "pointer",
    fontWeight: 50,
    whiteSpace: "nowrap",
    overflow: "hidden",
    pointerEvents: "painted",
  },
});

const setScheduleColor = (color: string) => {
  let scheduleColor;
  switch (color) {
    case "default":
      scheduleColor = "#000088";
      break;
    case "red":
      scheduleColor = "#880000";
      break;
    case "orange":
      scheduleColor = "#D2691E";
      break;
    case "green":
      scheduleColor = "#008800";
      break;
    default:
      break;
  }
  return scheduleColor;
};

type Props = {
  schedule: Schedule;
};

const ScheduleBar: React.FC<Props> = (props) => {
  const classes = useStyles();
  const schedule = props.schedule;
  const scheduleColor = setScheduleColor(schedule.color);
  const handleClickOpenSelectedScheduleDialog = useContext(CalendarContext);

  return (
    <div
      style={{ backgroundColor: scheduleColor }}
      className={classes.schedule}
      onClick={(e) => handleClickOpenSelectedScheduleDialog.handleClickOpenSelectedScheduleDialog(schedule, e)}
    >
      {schedule.title}
    </div>
  );
};

export default ScheduleBar;
