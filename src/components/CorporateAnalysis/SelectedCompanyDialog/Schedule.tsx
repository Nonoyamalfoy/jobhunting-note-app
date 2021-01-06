import React from "react";
import { Typography, Grid, makeStyles, Divider } from "@material-ui/core";
import HTMLReactParser from "html-react-parser";
import { Schedule as ISchedule } from "../../../type/user";
import dayjs from "dayjs";

const useStyles = makeStyles({
  dialogHeader: {
    display: "flex",
    justifyContent: "space-between",
    minHeight: 48,
    backgroundColor: "#20295f",
    color: "white",
    alignItems: "center",
    paddingLeft: "24px",
  },
  rectangle: {
    width: 8,
    height: 16,
    display: "block",
    borderRadius: "20%",
    backgroundColor: "rgba(0, 0, 0, 0.30)",
  },
  square: {
    height: 16,
    width: 16,
    display: "block",
    borderRadius: "20%",
    backgroundColor: "#20295f",
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

const returnCodeToBr = (text: string) => {
  if (text === "") {
    return text;
  } else {
    return HTMLReactParser(text.replace(/\r?\n/g, "<br/>"));
  }
};

type Props = {
  index: number;
  schedule: ISchedule;
};

const Schedule: React.FC<Props> = ({index, schedule}) => {
  const classes = useStyles();
  const scheduleColor = setScheduleColor(schedule.color);

  return (
    <>
      <Grid item container >
        <Grid item xs={12}>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <span
                style={{ backgroundColor: scheduleColor }}
                className={classes.square}
              ></span>
            </Grid>
            <Grid item>
              <p>{`日程${index + 1}`}</p>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <Typography variant="caption">タイトル</Typography>
            </Grid>
          </Grid>
          <Typography color="textSecondary">
            {returnCodeToBr(schedule.title)}
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <Typography variant="caption">日時</Typography>
            </Grid>
          </Grid>
          <Typography color="textSecondary">
            {dayjs(schedule.date).format("YYYY/MM/DD HH:mm")}
          </Typography>
          <Divider />
        </Grid>
        {schedule.description && (
          <Grid item xs={12}>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <Typography variant="caption">概要</Typography>
              </Grid>
            </Grid>
            <Typography color="textSecondary">
              {returnCodeToBr(schedule.description)}
            </Typography>
            <Divider />
          </Grid>
        )}
        {schedule.location && (
          <Grid item xs={12}>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <Typography variant="caption">場所</Typography>
              </Grid>
            </Grid>
            <Typography color="textSecondary">
              {returnCodeToBr(schedule.location)}
            </Typography>
            <Divider />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Schedule;
