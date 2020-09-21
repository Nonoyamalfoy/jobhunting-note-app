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
import { TextInput, SaveButton, CloseButton, SelectColorBox } from "../Uikit";
// import { setScheduleColor } from "../../services/schedule";
// import { isCloseDialog } from "../../services/schedule";
import dayjs from "dayjs";
import { createStringChangeEventCallback } from "../../lib/createHooks";

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
    margin: "0 auto",
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

  return (
    <Dialog
      className="dialog"
      open={props.open}
      onClose={props.handleClose}
      // fullScreen={matches}
      fullWidth
      // maxWidth="sm"
    >
      <div className="dialogHeader">
        <DialogActions>
          <CloseButton onClick={props.handleClose} />
        </DialogActions>
      </div>

      <DialogContent>
      <div className="module-spacer--medium" />
        <TextInput
          label="タイトル"
          autoFocus={true}
          value={title}
          multiline={true}
          type="text"
          onChange={createStringChangeEventCallback(setTitle)}
        />
        <div className="module-spacer--medium" />
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <SelectColorBox
              label="Color"
              required={true}
              select={inputColor}
              value={color}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              label="日時"
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


        <TextInput
          label="場所"
          value={location}
          multiline={true}
          onChange={createStringChangeEventCallback(setLocation)}
          type="text"
        />

        <div className="module-spacer--medium" />

        <TextInput
          label="概要"
          value={description}
          multiline={true}
          onChange={createStringChangeEventCallback(setDescription)}
          type="text"
        />

        <div className="module-spacer--medium" />
      </DialogContent>
      <DialogActions>
        <SaveButton onClick={() => {}} />
      </DialogActions>
    </Dialog>
  );
};

export default AddScheduleDialog;
