import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles,
  withStyles,
  Box,
  Divider,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  CloseButton,
  SaveButton,
  TextInput,
  MoreButton,
  SingleTextInputAccordion,
} from "../Uikit";
import { createStringChangeEventCallback } from "../../lib/createHooks";
import { useDispatch, useSelector } from "react-redux";
import { addStrengthsAndWeaknesses } from "../../reducks/user/operations";
import { push } from "connected-react-router";
import { RootState } from "../../entity/rootState";
import { getStrengths, getWeaknesses } from "../../reducks/user/selectors";

const useStyles = makeStyles({
  Accordion: {
    padding: 0,
    // borderBottom: "1px solid rgba(0, 0, 0, 0.54)",
    boxShadow: "none",
    margin: 0,
    marginTop: 5,
    "&:before": {
      display: "none",
    },
    "&.Mui-expanded": {
      margin: 0,
    },
  },
  AccordionSummary: {
    padding: "0px 16px 0px 0px",
    "& .MuiAccordionSummary-content": {
      margin: "17px 0px 7px 0px",
    },
  },
  AccordionDetails: {
    display: "block",
    backgroundColor: "#dfe3e7",
  },
  rectangle: {
    width: 8,
    height: 16,
    display: "block",
    borderRadius: "20%",
    backgroundColor: "rgba(0, 0, 0, 0.30)",
  },
  square: {
    height: 16,
    width: 16,
    display: "block",
    borderRadius: "20%",
    backgroundColor: "#20295f",
  },
  dividerBlack: {
    backgroundColor: "rgba(0, 0, 0, 0.54)",
  },
});

type Props = {
  open: boolean;
  handleClose: () => void;
};

const AddStrengthsAndWeaknessesDialog: React.FC<Props> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const currentStrengths = getStrengths(selector);
  const currentWeaknesses = getWeaknesses(selector);
  const matches = useMediaQuery("(max-width:960px)");
  const schrollType = matches ? "paper" : "body";

  const [strengths, setStrengths] = useState("");
  const [weaknesses, setWeaknesses] = useState("");

  useEffect(() => {
    setStrengths(currentStrengths);
    setWeaknesses(currentWeaknesses);
  }, [props.open]);

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
        <DialogContent>
          <SingleTextInputAccordion
            title="自分の強み"
            TextInputLabel="テキストを入力"
            TextInputValue={strengths}
            TextInputOnChange={createStringChangeEventCallback(setStrengths)}
          />
          <SingleTextInputAccordion
            title="自分の弱み"
            TextInputLabel="テキストを入力"
            TextInputValue={weaknesses}
            TextInputOnChange={createStringChangeEventCallback(setWeaknesses)}
          />
        </DialogContent>
        <DialogActions>
          <SaveButton
            onClick={() => {
              dispatch(
                addStrengthsAndWeaknesses({
                  strengths: strengths,
                  weaknesses: weaknesses,
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

export default AddStrengthsAndWeaknessesDialog;
