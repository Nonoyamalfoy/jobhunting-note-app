import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogActions } from "@material-ui/core";
import {
  CloseButton,
  SaveButton,
  TextInput,
  SingleTextInputAccordion,
} from "../Uikit";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createStringChangeEventCallback } from "../../lib/createHooks";
import { addBestWork } from "../../reducks/user/operations";
import { useDispatch } from "react-redux";
import { BestWork } from "../../entity/user";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogContent: {
      [theme.breakpoints.down(960)]: {
        padding: "8px 12px",
      },
    },
  })
);

type Props = {
  open: boolean;
  handleClose: () => void;
  bestWork: BestWork;
};

const AddBestWork: React.FC<Props> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const matches = useMediaQuery("(max-width:960px)");
  const schrollType = matches ? "paper" : "body";
  const bestWork = props.bestWork;

  const [title, setTitle] = useState("");
  const [whatIDid, setWhatIDid] = useState("");
  const [whatWasDifficult, setWhatWasDifficult] = useState("");
  const [whatIGot, setWhatIGot] = useState("");
  const [reasonsForWorking, setReasonsForWorking] = useState("");
  const [whatImakeUseOftheBestWork, setWhatImakeUseOftheBestWork] = useState(
    ""
  );

  useEffect(() => {
    setTitle(bestWork.title);
    setWhatIDid(bestWork.whatIDid);
    setWhatWasDifficult(bestWork.whatWasDifficult);
    setWhatIGot(bestWork.whatIGot);
    setReasonsForWorking(bestWork.reasonsForWorking);
    setWhatImakeUseOftheBestWork(bestWork.whatImakeUseOftheBestWork);
  }, [bestWork]);

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        scroll={schrollType}
        fullScreen={matches}
        fullWidth
        maxWidth="md"
      >
        <div className="dialogHeader">
          <DialogActions>
            <CloseButton onClick={props.handleClose} />
          </DialogActions>
        </div>
        <DialogContent className={classes.dialogContent}>
          <TextInput
            label={"タイトル"}
            multiline
            required={true}
            // rows={1}
            value={title}
            type={"text"}
            onChange={createStringChangeEventCallback(setTitle)}
          />
          <SingleTextInputAccordion
            title="何をやったか(行動と結果)"
            TextInputLabel="テキストを入力"
            TextInputValue={whatIDid}
            TextInputOnChange={createStringChangeEventCallback(setWhatIDid)}
          />
          <SingleTextInputAccordion
            title="何が困難だったか"
            TextInputLabel="テキストを入力"
            TextInputValue={whatWasDifficult}
            TextInputOnChange={createStringChangeEventCallback(
              setWhatWasDifficult
            )}
          />
          <SingleTextInputAccordion
            title="なぜ解決しようと思ったか"
            TextInputLabel="テキストを入力"
            TextInputValue={reasonsForWorking}
            TextInputOnChange={createStringChangeEventCallback(
              setReasonsForWorking
            )}
          />
          <SingleTextInputAccordion
            title="何を得たか"
            TextInputLabel="テキストを入力"
            TextInputValue={whatIGot}
            TextInputOnChange={createStringChangeEventCallback(setWhatIGot)}
          />
          <SingleTextInputAccordion
            title="何に活かせるか"
            TextInputLabel="テキストを入力"
            TextInputValue={whatImakeUseOftheBestWork}
            TextInputOnChange={createStringChangeEventCallback(
              setWhatImakeUseOftheBestWork
            )}
          />
        </DialogContent>
        <DialogActions>
          <SaveButton
            onClick={() => {
              dispatch(
                addBestWork({
                  bestWorkId: bestWork.bestWorkId,
                  title: title,
                  whatIDid: whatIDid,
                  whatWasDifficult: whatWasDifficult,
                  whatIGot: whatIGot,
                  reasonsForWorking: reasonsForWorking,
                  whatImakeUseOftheBestWork: whatImakeUseOftheBestWork,
                  created_at: bestWork.created_at,
                  updated_at: bestWork.updated_at,
                })
              );
              props.handleClose();
            }}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddBestWork;
