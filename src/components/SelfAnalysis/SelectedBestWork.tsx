import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { CloseButton, MoreButton } from "../Uikit";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { BestWork } from "../../type/user";
import HTMLReactParser from "html-react-parser";
import { db } from "../../firebase/index";
import { useSelector } from "react-redux";
import { RootState } from "../../type/rootState";
import { getUserId } from "../../reducks/user/selectors";
import { SelectedDialogAccordion } from "../Uikit";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogHeader: {
      display: "flex",
      justifyContent: "space-between",
      minHeight: 48,
      backgroundColor: "#20295f",
      color: "white",
      alignItems: "center",
      paddingLeft: "24px",
    },
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
  handleClickOpenAddBestWorkDialog: () => void;
  selectedBestWork: BestWork;
};

const SelectedBestWork: React.FC<Props> = (props) => {
  const classes = useStyles();
  const selector = useSelector((state: RootState) => state);
  const uid = getUserId(selector);
  const selectedBestWork = props.selectedBestWork;
  const matches = useMediaQuery("(max-width:960px)");
  const schrollType = matches ? "paper" : "body";

  const removeBestWork = (bestWorkId: string) => {
    db.collection("users")
      .doc(uid)
      .collection("bestWorks")
      .doc(bestWorkId)
      .delete();
  };

  const returnCodeToBr = (text: string) => {
    if (text === "") {
      return text;
    } else {
      return HTMLReactParser(text.replace(/\r?\n/g, "<br/>"));
    }
  };

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
        <div className={classes.dialogHeader}>
          <Typography>{selectedBestWork.title}</Typography>
          <DialogActions>
            <MoreButton
              color="white"
              size="small"
              onClickEdit={() => {
                props.handleClickOpenAddBestWorkDialog();
                props.handleClose();
              }}
              onClickRemove={() => {
                removeBestWork(selectedBestWork.bestWorkId);
                props.handleClose();
              }}
            />
            <CloseButton onClick={props.handleClose} />
          </DialogActions>
        </div>

        <DialogContent className={classes.dialogContent}>
          <SelectedDialogAccordion
            title="何をやったか(行動と結果)"
            onClick={() => {
              props.handleClickOpenAddBestWorkDialog();
              props.handleClose();
            }}
          >
            <Typography color="textSecondary">
              {returnCodeToBr(selectedBestWork.whatIDid)}
            </Typography>
          </SelectedDialogAccordion>

          <SelectedDialogAccordion
            title="何が困難だったか"
            onClick={() => {
              props.handleClickOpenAddBestWorkDialog();
              props.handleClose();
            }}
          >
            <Typography color="textSecondary">
              {returnCodeToBr(selectedBestWork.whatWasDifficult)}
            </Typography>
          </SelectedDialogAccordion>

          <SelectedDialogAccordion
            title="なぜ解決しようと思ったか"
            onClick={() => {
              props.handleClickOpenAddBestWorkDialog();
              props.handleClose();
            }}
          >
            <Typography color="textSecondary">
              {returnCodeToBr(selectedBestWork.reasonsForWorking)}
            </Typography>
          </SelectedDialogAccordion>

          <SelectedDialogAccordion
            title="何を得たか"
            onClick={() => {
              props.handleClickOpenAddBestWorkDialog();
              props.handleClose();
            }}
          >
            <Typography color="textSecondary">
              {returnCodeToBr(selectedBestWork.whatIGot)}
            </Typography>
          </SelectedDialogAccordion>

          <SelectedDialogAccordion
            title="何に活かせるか"
            onClick={() => {
              props.handleClickOpenAddBestWorkDialog();
              props.handleClose();
            }}
          >
            <Typography color="textSecondary">
              {returnCodeToBr(selectedBestWork.whatImakeUseOftheBestWork)}
            </Typography>
          </SelectedDialogAccordion>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SelectedBestWork;
