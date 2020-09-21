import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, DialogContent, DialogActions, Grid } from "@material-ui/core";
// import {
//   getIsDialogOpen,
//   getIsStartEdit,
//   getForm,n
// } from "../../reducks/addToDo/selector";
// import {
//   closeAddToDodialog,
//   setIsEditStart,
// } from "../../reducks/addToDo/operation";
import { Timer } from "@material-ui/icons";
import { DateTimePicker } from "@material-ui/pickers";
// import { setAddToDo } from "../../reducks/addToDo/operation";
// import { addToDo } from "../../reducks/users/operations";
import { SaveButton, TextInput, CloseButton } from "../Uikit";
import dayjs from "dayjs";
// import { isCloseDialog } from "../../services/ToDo";
import { createStringChangeEventCallback } from "../../lib/createHooks";

type Props = {
  open: boolean;
  handleClose: () => void;
};

const AddToDoDialog: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState(dayjs());
  // const form = getForm(selector);
  // const isDialogOpen = getIsDialogOpen(selector);
  // const isStartEdit = getIsStartEdit(selector);
  // const isTextInvalid = !form.text && isStartEdit;

  const inputDeadline = useCallback(
    (date) => {
      setDeadline(date);
    },
    [setDeadline]
  );

  return (
    <Dialog
      className="dialog"
      open={props.open}
      onClose={props.handleClose}
      maxWidth="sm"
      fullWidth
    >
      <div className="dialogHeader">
        <DialogActions>
          <CloseButton onClick={props.handleClose} />
        </DialogActions>
      </div>

      <DialogContent>
        <div className="module-spacer--medium" />
        <TextInput
          autoFocus={true}
          label="Text"
          value={title}
          type="text"
          multiline={true}
          onChange={createStringChangeEventCallback(setTitle)}
        />
        <div className="module-spacer--medium" />
        <DateTimePicker
          value={deadline}
          placeholder="deadline"
          label="deadline"
          ampm={false}
          onChange={inputDeadline}
          variant="inline"
          format="YYYY/MM/DD HH:mm"
          animateYearScrolling
          disableToolbar
          fullWidth
          inputProps={{ style: { fontSize: 17 } }}
          InputLabelProps={{ style: { fontSize: 17 } }}
        />
        <div className="module-spacer--medium" />
      </DialogContent>
      <DialogActions>
        <SaveButton onClick={() => {}} />
      </DialogActions>
    </Dialog>
  );
};

export default AddToDoDialog;
