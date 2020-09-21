import React, { useState, useCallback } from "react";
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
import { CloseButton, SaveButton, TextInput, MoreButton } from "../Uikit";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { createStringChangeEventCallback } from "../../lib/createHooks";

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

const AddBestWork: React.FC<Props> = (props) => {
  const classes = useStyles();
  const matches = useMediaQuery("(max-width:960px)");
  const schrollType = matches ? "paper" : "body";

  const [title, setTitle] = useState("");
  const [whatIDid, setWhatIDid] = useState("");
  const [whatWasDifficult, setWhatWasDifficult] = useState("");
  const [whatIGot, setWhatIGot] = useState("");
  const [reasonsForWorking, setReasonsForWorking] = useState("");
  const [whyIWantedToSolve, setWhyIWantedToSolve] = useState("");

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
          <TextInput
            label={"タイトル"}
            multiline
            required={true}
            // rows={1}
            value={title}
            type={"text"}
            onChange={createStringChangeEventCallback(setTitle)}
          />
          <Accordion defaultExpanded className={classes.Accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              className={classes.AccordionSummary}
            >
              <Typography>何をやったか(行動と結果)</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.AccordionDetails}>
              <TextInput
                label={"テキストを入力"}
                multiline
                required={true}
                // rows={1}
                value={whatIDid}
                type={"text"}
                onChange={createStringChangeEventCallback(setWhatIDid)}
              />
            </AccordionDetails>
          </Accordion>
          <Divider className={classes.dividerBlack} />

          <Accordion defaultExpanded className={classes.Accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              className={classes.AccordionSummary}
            >
              <Typography>何が困難だったか</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.AccordionDetails}>
              <TextInput
                label={"テキストを入力"}
                multiline
                required={true}
                // rows={1}
                value={whatWasDifficult}
                type={"text"}
                onChange={createStringChangeEventCallback(setWhatWasDifficult)}
              />
            </AccordionDetails>
          </Accordion>
          <Divider className={classes.dividerBlack} />

          <Accordion defaultExpanded className={classes.Accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              className={classes.AccordionSummary}
            >
              <Typography>なぜ解決しようと思ったか</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.AccordionDetails}>
              <TextInput
                label={"テキストを入力"}
                multiline
                required={true}
                // rows={1}
                value={reasonsForWorking}
                type={"text"}
                onChange={createStringChangeEventCallback(setReasonsForWorking)}
              />
            </AccordionDetails>
          </Accordion>
          <Divider className={classes.dividerBlack} />

          <Accordion defaultExpanded className={classes.Accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              className={classes.AccordionSummary}
            >
              <Typography>何を得たか</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.AccordionDetails}>
              <TextInput
                label={"テキストを入力"}
                multiline
                required={true}
                // rows={1}
                value={whatIGot}
                type={"text"}
                onChange={createStringChangeEventCallback(setWhatIGot)}
              />
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded className={classes.Accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              className={classes.AccordionSummary}
            >
              <Typography>何に活かせるか</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.AccordionDetails}>
              <TextInput
                label={"テキストを入力"}
                multiline
                required={true}
                // rows={1}
                value={whyIWantedToSolve}
                type={"text"}
                onChange={createStringChangeEventCallback(setWhyIWantedToSolve)}
              />
            </AccordionDetails>
          </Accordion>
          <Divider className={classes.dividerBlack} />
        </DialogContent>
        <DialogActions>
          <SaveButton onClick={() => {}} />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddBestWork;
