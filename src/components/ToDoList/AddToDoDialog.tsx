import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {Dialog, DialogContent, DialogActions, Grid} from "@material-ui/core";
// import {
//   getIsDialogOpen,
//   getIsStartEdit,
//   getForm,
// } from "../../reducks/addToDo/selector";
// import {
//   closeAddToDodialog,
//   setIsEditStart,
// } from "../../reducks/addToDo/operation";
import {
  Timer,
} from "@material-ui/icons";
import { DateTimePicker } from "@material-ui/pickers";
// import { setAddToDo } from "../../reducks/addToDo/operation";
// import { addToDo } from "../../reducks/users/operations";
import { SaveButton, TextInput, CloseButton } from "../Uikit";
import dayjs from "dayjs";
// import { isCloseDialog } from "../../services/ToDo";

type Props = {
  open: boolean;
  handleClose: () => void;
}

const AddToDoDialog: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  // const form = getForm(selector);
  // const isDialogOpen = getIsDialogOpen(selector);
  // const isStartEdit = getIsStartEdit(selector);
  // const isTextInvalid = !form.text && isStartEdit;

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
          <CloseButton onClick={props.handleClose}/>
        </DialogActions>
      </div>

      <DialogContent>
        <TextInput
          autoFocus={true}
          label="Text"
          value="aaa"
          type="text"
          multiline={true}
          onChange={(e) => {}}
        />
        <Grid container spacing={1} alignItems="center" justify="space-between">
          <Grid item>
            <Timer />
          </Grid>
          <Grid item xs={10}>
            <DateTimePicker
              value={dayjs()}
              placeholder="deadline"
              // label="deadline"
              ampm={false}
              onChange={(d) =>{}}
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
      </DialogContent>
      <DialogActions>
        <SaveButton
          onClick={() => {}}
        />
      </DialogActions>
    </Dialog>
  );
};

export default AddToDoDialog;
