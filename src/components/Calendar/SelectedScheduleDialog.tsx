import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
  Divider,
} from "@material-ui/core";
import { LocationOnOutlined, NotesOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { getUserId } from "../../reducks/user/selectors";
import { MoreButton, CloseButton } from "../Uikit";
import { RootState } from "../../type/rootState";
import { Schedule } from "../../type/user";
import HTMLReactParser from "html-react-parser";
import { db } from "../../firebase/index";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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
  square: {
    width: 16,
    height: 16,
    display: "block",
    // marginLeft: 6,
    borderRadius: 4,
    border: "1px solid #ccc",
  },
  rectangle: {
    width: 8,
    height: 16,
    display: "block",
    borderRadius: "20%",
    backgroundColor: "rgba(0, 0, 0, 0.30)",
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
  open: boolean;
  schedule: Schedule;
  handleCloseSelectedScheduleDialog: () => void;
  handleClickOpenAddScheduleDialog: () => void;
};

const SelectedScheduleDialog: React.FC<Props> = ({
  open,
  schedule,
  handleCloseSelectedScheduleDialog,
  handleClickOpenAddScheduleDialog,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const uid = getUserId(selector);
  const scheduleColor = setScheduleColor(schedule.color);
  const matches = useMediaQuery("(max-width:960px)");
  const schrollType = matches ? "paper" : "body";

  const removeSchedule = (scheduleId: string) => {
    db.collection("users")
      .doc(uid)
      .collection("schedules")
      .doc(scheduleId)
      .delete();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseSelectedScheduleDialog}
      maxWidth="sm"
      fullWidth
      fullScreen={matches}
      scroll={schrollType}
    >
      <div className={classes.dialogHeader}>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <span
              style={{ backgroundColor: scheduleColor }}
              className={classes.square}
            ></span>
          </Grid>
          <Grid item>
            <Typography>{schedule.title}</Typography>
          </Grid>
        </Grid>
        <DialogActions>
          <MoreButton
            color="white"
            size="small"
            onClickEdit={() => {
              handleCloseSelectedScheduleDialog();
              handleClickOpenAddScheduleDialog();
            }}
            onClickRemove={() => {
              removeSchedule(schedule.scheduleId);
              handleCloseSelectedScheduleDialog();
            }}
          />
          <CloseButton onClick={handleCloseSelectedScheduleDialog} />
        </DialogActions>
      </div>

      <DialogContent>
        <div>
          <div className="module-spacer--medium" />

          <Grid item container spacing={1} alignItems="center">
            <Grid item>
              <span className={classes.rectangle}></span>
            </Grid>
            <Grid item>
              <Typography>日時</Typography>
            </Grid>
          </Grid>
          <Typography color="textSecondary">
            {dayjs(schedule.date).format("YYYY/MM/DD HH:mm")}
          </Typography>
          <Divider />
          <div className="module-spacer--medium" />

          {schedule.description && (
            <>
              <Grid item container spacing={1} alignItems="center">
                <Grid item>
                  <span className={classes.rectangle}></span>
                </Grid>
                <Grid item>
                  <Typography>概要</Typography>
                </Grid>
              </Grid>
              <Typography color="textSecondary">
                {returnCodeToBr(schedule.description)}
              </Typography>
              <Divider />
              <div className="module-spacer--medium" />
            </>
          )}

          {schedule.location && (
            <>
              <Grid item container spacing={1} alignItems="center">
                <Grid item>
                  <span className={classes.rectangle}></span>
                </Grid>
                <Grid item>
                  <Typography>場所</Typography>
                </Grid>
              </Grid>
              <Typography color="textSecondary">
                {returnCodeToBr(schedule.location)}
              </Typography>
              <Divider />
              <div className="module-spacer--medium" />
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectedScheduleDialog;
