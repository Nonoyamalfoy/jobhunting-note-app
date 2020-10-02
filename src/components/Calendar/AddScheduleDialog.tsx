import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, DialogContent, DialogActions, Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { DateTimePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/styles";
import {
  TextInput,
  SaveButton,
  CloseButton,
  SelectColorBox,
  ValidationTextInput,
} from "../Uikit";
import dayjs from "dayjs";
import { createStringChangeEventCallback } from "../../lib/createHooks";
import { addSchedule } from "../../reducks/user/operations";
import { Schedule } from "../../type/user";

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

type Props = {
  schedule: Schedule;
  open: boolean;
  handleClose: () => void;
};

const AddScheduleDialog: React.FC<Props> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [color, setColor] = useState("default");
  const [date, setDate] = useState(day.format("YYYYMMDDHHmm"));
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [isTitleEditStart, setIsTietleEditStart] = useState(false);
  const isTitleInValid = !title && isTitleEditStart;

  const scheduel = props.schedule;
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
      setDate(date.format("YYYYMMDDHHmm"));
    },
    [setDate]
  );

  useEffect(() => {
    setTitle(scheduel.title);
    setColor(scheduel.color);
    setDate(scheduel.date);
    setDescription(scheduel.description);
    setLocation(scheduel.location);
  }, [scheduel]);

  return (
    <Dialog
      className="dialog"
      open={props.open}
      onClose={() => {
        props.handleClose();
        setIsTietleEditStart(false);
      }}
      fullScreen={matches}
      scroll={schrollType}
      fullWidth
      // maxWidth="sm"
    >
      <div className="dialogHeader">
        <DialogActions>
          <CloseButton
            onClick={() => {
              props.handleClose();
              setIsTietleEditStart(false);
            }}
          />
        </DialogActions>
      </div>

      <DialogContent>
        <div className="module-spacer--medium" />
        <ValidationTextInput
          autoFocus={true}
          label="タイトル"
          value={title}
          multiline={true}
          onChange={createStringChangeEventCallback(setTitle)}
          type="text"
          required={true}
          onBlur={() => setIsTietleEditStart(true)}
          error={isTitleInValid}
          validationText="必須項目が未入力です"
        />
        <div className="module-spacer--small" />
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <SelectColorBox
              label="色"
              required={true}
              select={inputColor}
              value={color}
            />
          </Grid>
          <Grid item xs={6}>
            <DateTimePicker
              value={date}
              label="日時"
              ampm={false}
              onChange={inputDate}
              variant="inline"
              format="YYYY/MM/DD HH:mm"
              animateYearScrolling
              disableToolbar
              fullWidth
              inputProps={{ style: { fontSize: 17 } }}
              InputLabelProps={{ style: { fontSize: 17 } }}
            />
          </Grid>
        </Grid>

        <div className="module-spacer--small" />

        <TextInput
          label="概要"
          value={description}
          multiline={true}
          onChange={createStringChangeEventCallback(setDescription)}
          type="text"
        />

        <div className="module-spacer--small" />

        <TextInput
          label="場所"
          value={location}
          multiline={true}
          onChange={createStringChangeEventCallback(setLocation)}
          type="text"
        />
      </DialogContent>
      <DialogActions>
        <SaveButton
          onClick={() => {
            dispatch(
              addSchedule({
                scheduleId: scheduel.scheduleId,
                title: title,
                color: color,
                date: date,
                description: description,
                location: location,
              })
            );
            props.handleClose();
            setIsTietleEditStart(false);
          }}
        />
      </DialogActions>
    </Dialog>
  );
};

export default AddScheduleDialog;
