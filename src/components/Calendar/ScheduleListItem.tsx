import React, { useContext } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import dayjs from "dayjs";
import { ListItemSecondaryAction, Grid } from "@material-ui/core";
import { RootState } from "../../type/rootState";
import { Schedule } from "../../type/user";
import { MoreButton } from "../Uikit";
import { CalendarContext } from "../../contexts";
import { getUserId } from "../../reducks/user/selectors";
import { db } from "../../firebase/index";

const useStyles = makeStyles({
  scheduleListItem: {
    // padding: "0 10px 0 18px",
    width: "95%",
    margin: "8px auto",
    border: "1px solid #ccc",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    transition: "all 0.3s",
    "&:hover": {
      boxShadow:
        "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
      transform: "translateY(-3px)",
    },
    minHeight: 52,
    borderRadius: 4,
  },
  box: {
    width: 16,
    height: 16,
    display: "block",
    marginLeft: 6,
    borderRadius: 4,
  },
  text: {
    boxSizing: "border-box",
    paddingLeft: "20px",
    width: "100%",
    wordWrap: "break-word",
    marginRight: 40,
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

const ScheduleListItem: React.FC<Props> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const uid = getUserId(selector);
  const schedule = props.schedule;
  const title = schedule.title;
  const description = schedule.description;
  const scheduleColor = schedule ? setScheduleColor(schedule.color) : "";
  const handleClickOpenSelectedScheduleDialog = useContext(CalendarContext)
    .handleClickOpenSelectedScheduleDialog;
  const handleClickOpenAddScheduleDialog = useContext(CalendarContext)
    .handleClickOpenAddScheduleDialog;

  const removeSchedule = (scheduleId: string) => {
    db.collection("users")
      .doc(uid)
      .collection("schedules")
      .doc(scheduleId)
      .delete();
  };

  return (
    <div className={classes.scheduleListItem}>
      <ListItem
        onClick={(e) => handleClickOpenSelectedScheduleDialog(schedule, e)}
        button
      >
        <Grid item>
          <span
            style={{ backgroundColor: scheduleColor }}
            className={classes.box}
          ></span>
        </Grid>
        <ListItemText
          className={classes.text}
          primary={title}
          secondary={description}
        />
        <ListItemSecondaryAction>
          <MoreButton
            size="medium"
            onClickEdit={() => handleClickOpenAddScheduleDialog(schedule)}
            onClickRemove={() => removeSchedule(schedule.scheduleId)}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
};

export default ScheduleListItem;
