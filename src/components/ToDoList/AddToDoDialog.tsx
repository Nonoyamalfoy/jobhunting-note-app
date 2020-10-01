import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, DialogContent, DialogActions, Grid } from "@material-ui/core";
import { Timer } from "@material-ui/icons";
import { DateTimePicker } from "@material-ui/pickers";
import { SaveButton, CloseButton, ValidationTextInput } from "../Uikit";
import dayjs from "dayjs";
import { createStringChangeEventCallback } from "../../lib/createHooks";
import { addToDo } from "../../reducks/user/operations";
import { ToDo } from "../../entity/user";
import { db } from "../../firebase/index";
import { getUserId } from "../../reducks/user/selectors";
import { RootState } from "../../entity/rootState";
import useMediaQuery from "@material-ui/core/useMediaQuery";

type Props = {
  open: boolean;
  handleClose: () => void;
  toDo: ToDo;
};

const AddToDoDialog: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const toDo = props.toDo;
  const uid = getUserId(selector);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState(dayjs().format("YYYYMMDDHHmm"));
  const [isTitleEditStart, setIsTietleEditStart] = useState(false);
  const isTitleInValid = !title && isTitleEditStart;

  const matches = useMediaQuery("(max-width:960px)");
  const schrollType = matches ? "paper" : "body";

  const inputDeadline = useCallback(
    (date) => {
      setDeadline(date.format("YYYYMMDDHHmm"));
    },
    [setDeadline]
  );

  useEffect(() => {
    setTitle(toDo.title);
    setDeadline(toDo.deadline);
  }, [toDo]);

  return (
    <Dialog
      className="dialog"
      open={props.open}
      onClose={() => {
        props.handleClose();
        setIsTietleEditStart(false);
      }}
      maxWidth="sm"
      fullWidth
      scroll={schrollType}
      fullScreen={matches}
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
        {/* <div className="module-spacer--medium" /> */}
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
          validationText="タイトルは必須項目です"
        />
        <div className="module-spacer--extra-small" />
        <DateTimePicker
          value={deadline}
          placeholder="deadline"
          label="日時"
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
        {/* <div className="module-spacer--medium" /> */}
      </DialogContent>
      <DialogActions>
        <SaveButton
          onClick={() => {
            dispatch(
              addToDo({
                toDoId: toDo.toDoId,
                title: title,
                deadline: deadline,
                completed: toDo.completed,
              })
            );
            if (title !== "") {
              props.handleClose();
              setIsTietleEditStart(false);
            }
          }}
        />
      </DialogActions>
    </Dialog>
  );
};

export default AddToDoDialog;
