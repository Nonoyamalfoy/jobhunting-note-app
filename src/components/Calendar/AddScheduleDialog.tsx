import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, DialogContent, DialogActions, Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// import {
//   getIsDialogOpen,
//   getIsStartEdit,
//   getForm,
// } from "../../reducks/addSchedule/selector";
// import {
//   closeAddScheduledialog,
//   setIsEditStart,
// } from "../../reducks/addSchedule/operation";
import {
  LocationOnOutlined,
  NotesOutlined,
  AccessTime,
} from "@material-ui/icons";
import { DatePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/styles";
// import { setAddSchedule } from "../../reducks/addSchedule/operation";
// import { addSchedule } from "../../reducks/users/operations";
import { TextInput, SaveButton, CloseButton, SelectBox } from "../Uikit";
// import { setScheduleColor } from "../../services/schedule";
// import { isCloseDialog } from "../../services/schedule";
import dayjs from "dayjs";

const day = dayjs();

const useStyles = makeStyles({
  box: {
    width: 16,
    height: 16,
    display: "block",
    // marginLeft: 6,
    borderRadius: 4,
  },
  icon: {
    margin: "0 auto"
  }
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
  open: boolean;
  handleClose: () => void;
};

const AddScheduleDialog: React.FC<Props> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [color, setColor] = useState("default");
  const [date, setDate] = useState(day);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const scheduleColor = setScheduleColor(color);
  const matches = useMediaQuery("(max-width:960px)");
  const schrollType = matches ? "paper" : "body";

  const colors = [
    { id: "default", name: "default" },
    { id: "red", name: "red" },
    { id: "orange", name: "orange" },
    { id: "green", name: "green" },
  ];

  

  const inputTitle = useCallback(
    (event) => {
      setTitle(event.target.value);
    },
    [setTitle]
  );
  const inputColor = useCallback(
    (color) => {
      setColor(color);
    },
    [setColor]
  );
  const inputDate = useCallback(
    (date) => {
      setDate(date);
    },
    [setDate]
  );
  const inputLocation = useCallback(
    (event) => {
      setLocation(event.target.value);
    },
    [setLocation]
  );
  const inputDescription = useCallback(
    (event) => {
      setDescription(event.target.value);
    },
    [setDescription]
  );

  return (
    <Dialog
      className="dialog"
      open={props.open}
      onClose={props.handleClose}
      fullScreen={matches}
      fullWidth
      maxWidth="sm"
    >
      <div className="dialogHeader">
        <DialogActions>
          <CloseButton onClick={props.handleClose} />
        </DialogActions>
      </div>

      <DialogContent>
        <TextInput
          label="タイトル"
          autoFocus={true}
          value={title}
          multiline={true}
          type="text"
          onChange={inputTitle}
        />
        <div className="module-spacer--medium"/>
        <Grid container spacing={1} alignItems="center" >
          <Grid item className={classes.icon}>
            <span
              style={{ backgroundColor: scheduleColor }}
              className={classes.box}
            ></span>
          </Grid>

          <Grid item xs={10}>
            <SelectBox
              label="Color"
              required={true}
              options={colors}
              select={inputColor}
              value={color}
            />
          </Grid>
        </Grid>
        <div className="module-spacer--medium"/>

        <Grid
          container
          // spacing={1}
          alignItems="flex-end"
          justify="space-between"
        >
          <Grid item className={classes.icon}>
            <AccessTime />
          </Grid>
          <Grid item xs={10}>
            <DatePicker
              value={date}
              onChange={inputDate}
              variant="inline"
              format="YYYY/MM/DD"
              animateYearScrolling
              disableToolbar
              fullWidth
              inputProps={{ style: { fontSize: 17 } }}
              InputLabelProps={{ style: { fontSize: 17 } }}
            />
          </Grid>
        </Grid>
        <div className="module-spacer--medium"/>

        <Grid
          container
          spacing={1}
          alignItems="flex-end"
          justify="space-between"
        >
          <Grid item className={classes.icon}>
            <LocationOnOutlined />
          </Grid>
          <Grid item xs={10}>
            <TextInput
              label="場所"
              value={location}
              multiline={true}
              onChange={inputLocation}
              type="text"
            />
          </Grid>
        </Grid>
        <div className="module-spacer--medium"/>

        <Grid
          container
          spacing={1}
          alignItems="flex-end"
          justify="space-between"
        >
          <Grid item className={classes.icon}>
            <NotesOutlined />
          </Grid>
          <Grid item xs={10}>
            <TextInput
              label="概要"
              value={description}
              multiline={true}
              onChange={inputDescription}
              type="text"
            />
          </Grid>
        </Grid>
        <div className="module-spacer--small"/>
        
      </DialogContent>
      <DialogActions>
        <SaveButton onClick={() => {}} />
      </DialogActions>
    </Dialog>
  );
};

export default AddScheduleDialog;
