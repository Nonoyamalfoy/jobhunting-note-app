import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import { CloseButton, CreateButton } from "../Uikit";
import List from "@material-ui/core/List";
import { getSchedules } from "../../reducks/user/selectors";
import { getCurrentDate } from "../../reducks/calendar/selector";
import { RootState } from "../../type/rootState";
import dayjs from "dayjs";
import { ScheduleListItem } from "./";

const useStyles = makeStyles({
  box: {
    width: 16,
    height: 16,
    display: "block",
    marginLeft: 6,
    borderRadius: 4,
  },
  dialogHeader: {
    display: "flex",
    justifyContent: "space-between",
    minHeight: 48,
    backgroundColor: "#20295f",
    color: "white",
    alignItems: "center",
  },
  diaryDate: {
    position: "relative",
    paddingLeft: "24px",
  },
  dialogContent: {
    minHeight: 100,
    padding: 0,
  },
  icon: {
    color: "white",
  },
});

type Props = {
  open: boolean;
  handleClose: () => void;
};

const SelectedScheduleDialog: React.FC<Props> = (props) => {
  const classes = useStyles();
  const selector = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const currentDate = getCurrentDate(selector);
  const formatCurrentDate = currentDate.format("YYYY/MM/DD");
  const schedules = getSchedules(selector);
  const currentDateSchedules = schedules
    ? schedules.filter(
        (s) =>
          dayjs(s.date).format("YYYYMMDD") === currentDate.format("YYYYMMDD")
      )
    : [];

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      maxWidth="xs"
      fullWidth
    >
      <div className={classes.dialogHeader}>
        <Typography className={classes.diaryDate} variant="h5" component="h2">
          {formatCurrentDate}
        </Typography>
        <DialogActions>
          {/* <CreateButton size="small" onClick={() => {}} /> */}
          <CloseButton onClick={props.handleClose} />
        </DialogActions>
      </div>
      <DialogContent className={classes.dialogContent}>
        {currentDateSchedules.length > 0 ? (
          <List>
            {currentDateSchedules.map((schedule) => (
              <ScheduleListItem schedule={schedule} />
            ))}
          </List>
        ) : (
          <p className="empty-item">追加された日程はありません</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SelectedScheduleDialog;
