import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// import {
//   getIsDialogOpen,
//   getIsStartEdit,
//   getForm,
// } from "../../reducks/addSchedule/selector";
// import {
//   closeAddMotivation,
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
import { TextInput, SaveButton, CloseButton, SelectAgeBox } from "../Uikit";
// import { setScheduleColor } from "../../services/schedule";
// import { isCloseDialog } from "../../services/schedule";
import dayjs from "dayjs";
import {
  createStringChangeEventCallback,
  createNumberChangeEventCallback,
} from "../../lib/createHooks";

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
  formControl: {
    // margin: theme.spacing(1),
    // minWidth: 120,
  },
});

type Props = {
  open: boolean;
  handleClose: () => void;
};

const setAges = () => {
  const ages = [];
  for (let i = 0; i <= 60; i++) {
    ages.push(i);
  }
  return ages;
};

const setMotivations = () => {
  const ages = [];
  for (let i = -50; i <= 100; i++) {
    ages.push(i);
  }
  return ages;
};

const AddMotivation: React.FC<Props> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [age, setAge] = useState(0);
  const [motivation, setMotivation] = useState(0);
  const [description, setDescription] = useState("");

  const ages = setAges()
  const motivations = setMotivations()
  

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
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <SelectAgeBox
              value={age}
              label="年齢"
              required={true}
              options={ages}
              select={createNumberChangeEventCallback(setAge)}
              unit="歳"
            />
          </Grid>
          <Grid item xs={6}>
            <SelectAgeBox
              value={motivation}
              label="モチベーション"
              required={true}
              options={motivations}
              select={createNumberChangeEventCallback(setMotivation)}
              unit="%"
            />
          </Grid>
        </Grid>

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

export default AddMotivation;
