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

import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Rating from "@material-ui/lab/Rating";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const useStyles = makeStyles({
  dialogHeader: {
    display: "flex",
    justifyContent: "space-between",
    minHeight: 48,
    backgroundColor: "#20295f",
    color: "white",
    alignItems: "center",
    paddingLeft: "24px",
  },
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

  const [whatIDid, setWhatIDid] = useState("");
  const [whatWasDifficult, setWhatWasDifficult] = useState("");
  const [whatIGot, setWhteIGot] = useState("");
  const [reasonsForWorking, setReasonsForWorking] = useState("");
  const [whyIWantedToSolve, setWhyIWantedToSolve] = useState("");

  const inputWhatIDid = useCallback(
    (event) => {
      setWhatIDid(event.target.value);
    },
    [setWhatIDid]
  );
  const inputWhatWasDifficult = useCallback(
    (event) => {
      setWhatWasDifficult(event.target.value);
    },
    [setWhatWasDifficult]
  );
  const inputWhatIGot = useCallback(
    (event) => {
      setWhteIGot(event.target.value);
    },
    [setWhteIGot]
  );
  const inputReasonsForWorking = useCallback(
    (event) => {
      setReasonsForWorking(event.target.value);
    },
    [setReasonsForWorking]
  );
  const inputWhyIWhantedToSolve = useCallback(
    (event) => {
      setWhyIWantedToSolve(event.target.value);
    },
    [setWhyIWantedToSolve]
  );

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
          <Typography>
            バスケ部キャプテンとしてリーダーシップを発揮した
          </Typography>
          <DialogActions>
            <CloseButton onClick={props.handleClose} />
          </DialogActions>
        </div>
        <DialogContent>
          <Accordion defaultExpanded className={classes.Accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              className={classes.AccordionSummary}
            >
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <span className={classes.square}></span>
                </Grid>
                <Grid item>
                  <Typography>何をやったか(行動と結果)</Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails className={classes.AccordionDetails}>
              <TextInput
                label={"テキストを入力"}
                multiline
                required={true}
                // rows={1}
                value={whatIDid}
                type={"text"}
                onChange={inputWhatIDid}
              />
            </AccordionDetails>
          </Accordion>
          <Divider className={classes.dividerBlack} />

          <Accordion defaultExpanded className={classes.Accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              className={classes.AccordionSummary}
            >
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <span className={classes.square}></span>
                </Grid>
                <Grid item>
                  <Typography>何が困難だったか</Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails className={classes.AccordionDetails}>
              <TextInput
                label={"テキストを入力"}
                multiline
                required={true}
                // rows={1}
                value={whatWasDifficult}
                type={"text"}
                onChange={inputWhatWasDifficult}
              />
            </AccordionDetails>
          </Accordion>
          <Divider className={classes.dividerBlack} />

          <Accordion defaultExpanded className={classes.Accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              className={classes.AccordionSummary}
            >
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <span className={classes.square}></span>
                </Grid>
                <Grid item>
                  <Typography>なぜ解決しようと思ったか</Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails className={classes.AccordionDetails}>
              <TextInput
                label={"テキストを入力"}
                multiline
                required={true}
                // rows={1}
                value={reasonsForWorking}
                type={"text"}
                onChange={inputReasonsForWorking}
              />
            </AccordionDetails>
          </Accordion>
          <Divider className={classes.dividerBlack} />

          <Accordion defaultExpanded className={classes.Accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              className={classes.AccordionSummary}
            >
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <span className={classes.square}></span>
                </Grid>
                <Grid item>
                  <Typography>何を得たか</Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails className={classes.AccordionDetails}>
              <TextInput
                label={"テキストを入力"}
                multiline
                required={true}
                // rows={1}
                value={whatIGot}
                type={"text"}
                onChange={inputWhatIGot}
              />
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded className={classes.Accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              className={classes.AccordionSummary}
            >
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <span className={classes.square}></span>
                </Grid>
                <Grid item>
                  <Typography>何に活かせるか</Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails className={classes.AccordionDetails}>
              <TextInput
                label={"テキストを入力"}
                multiline
                required={true}
                // rows={1}
                value={whyIWantedToSolve}
                type={"text"}
                onChange={inputWhyIWhantedToSolve}
              />
            </AccordionDetails>
          </Accordion>
          <Divider className={classes.dividerBlack} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddBestWork;
