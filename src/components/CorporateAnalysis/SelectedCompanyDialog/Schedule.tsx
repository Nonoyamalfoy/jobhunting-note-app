import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles,
  Box,
  Divider,
} from "@material-ui/core";
import HTMLReactParser from "html-react-parser";
import { Schedule as ISchedule } from "../../../entity/user";
import { useSelector } from "react-redux";
import { RootState } from "../../../entity/rootState";
import { getSchedules } from "../../../reducks/user/selectors";
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
  Accordion: {
    padding: 0,
    borderBottom: "1px solid rgba(0, 0, 0, 0.54)",
    boxShadow: "none",
    margin: 0,
    marginTop: 5,
    "&:before": {
      display: "none",
    },
    "&.Mui-expanded": {
      margin: 0,
    },
  },
  AccordionSummary: {
    padding: "0px 16px 0px 0px",
    "& .MuiAccordionSummary-content": {
      margin: "17px 0px 7px 0px",
    },
  },
  AccordionDetails: {
    display: "block",
    backgroundColor: "#dfe3e7",
    position: "relative",
  },
  box: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.54)",
    marginTop: 10,
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

type Props = {
  schedule: ISchedule;
  index: number;
};

const Schedule: React.FC<Props> = (props) => {
  const classes = useStyles();
  const selector = useSelector((state: RootState) => state);
  const schedules = getSchedules(selector);
  const scheduleId = props.schedule.scheduleId
  // const schedule = schedules.filter((schedule) => schedule.scheduleId === scheduleId)[0]
  const schedule = props.schedule

  const returnCodeToBr = (text: string) => {
    if (text === "") {
      return text;
    } else {
      return HTMLReactParser(text.replace(/\r?\n/g, "<br/>"));
    }
  };

  return (
    <>
      <Grid item container key={props.index}>
        <Grid item xs={12}>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <span className={classes.rectangle}></span>
            </Grid>
            <Grid item>
              <p>{`日程${props.index + 1}`}</p>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <Typography variant="caption">日時</Typography>
            </Grid>
          </Grid>
          <Typography color="textSecondary">{dayjs(schedule.date).format("YYYY/MM/DD HH:mm")}</Typography>
          <Divider />
        </Grid>
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
      </Grid>
    </>
  );
};

export default Schedule;
