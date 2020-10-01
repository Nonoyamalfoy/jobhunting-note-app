import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { CloseButton, MoreButton } from "../Uikit";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { CreateButton } from "../Uikit";
import { BestWork } from "../../entity/user";
import HTMLReactParser from "html-react-parser";
import { db } from "../../firebase/index";
import { useSelector } from "react-redux";
import { RootState } from "../../entity/rootState";
import { getUserId } from "../../reducks/user/selectors";

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
    Accordion: {
      padding: 0,
      borderBottom: "1px solid rgba(0, 0, 0, 0.54)",
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
      padding: 0,
      // padding: "0px 16px 0px 0px",
      "& .MuiAccordionSummary-content": {
        margin: "17px 0px 7px 0px",
      },
    },
    AccordionDetails: {
      display: "block",
      backgroundColor: "#dfe3e7",
      cursor: "pointer",
      borderRadius: 4,
      [theme.breakpoints.down(960)]: {
        padding: "8px 5px 16px",
      },
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
      marginTop: 16,
      backgroundColor: "rgba(0, 0, 0, 0.54)",
    },
    textContainer: {
      padding: "8px 0px 16px 0px",
      position: "relative",
      [theme.breakpoints.up(960)]: {
        padding: "8px 16px 16px 16px",
      },
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
            <AccordionDetails
              className={classes.AccordionDetails}
              onClick={() => {
                props.handleClickOpenAddBestWorkDialog();
                props.handleClose();
              }}
            >
              <Typography color="textSecondary">
                {returnCodeToBr(selectedBestWork.whatIDid)}
              </Typography>
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
                  <Typography>何が困難だったか</Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails
              className={classes.AccordionDetails}
              onClick={() => {
                props.handleClickOpenAddBestWorkDialog();
                props.handleClose();
              }}
            >
              <Typography color="textSecondary">
                {returnCodeToBr(selectedBestWork.whatWasDifficult)}
              </Typography>
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
                  <Typography>なぜ解決しようと思ったか</Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails
              className={classes.AccordionDetails}
              onClick={() => {
                props.handleClickOpenAddBestWorkDialog();
                props.handleClose();
              }}
            >
              <Typography color="textSecondary">
                {returnCodeToBr(selectedBestWork.reasonsForWorking)}
              </Typography>
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
                  <Typography>何を得たか</Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails
              className={classes.AccordionDetails}
              onClick={() => {
                props.handleClickOpenAddBestWorkDialog();
                props.handleClose();
              }}
            >
              <Typography color="textSecondary">
                {returnCodeToBr(selectedBestWork.whatIGot)}
              </Typography>
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
            <AccordionDetails
              className={classes.AccordionDetails}
              onClick={() => {
                props.handleClickOpenAddBestWorkDialog();
                props.handleClose();
              }}
            >
              <Typography color="textSecondary">
                {returnCodeToBr(selectedBestWork.whatImakeUseOftheBestWork)}
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* <div className={classes.textContainer}>
            <CreateButton
              size="small"
              onClick={() => {
                props.handleClickOpenAddBestWorkDialog();
                props.handleClose();
              }}
            />
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.square}></span>
              </Grid>
              <Grid item>
                <p>何をやったか(行動と結果)</p>
              </Grid>
            </Grid>

            <Typography color="textSecondary">
              {returnCodeToBr(selectedBestWork.whatIDid)}
            </Typography>
            <Divider className={classes.dividerBlack} />
          </div>

          <div className={classes.textContainer}>
            <CreateButton
              size="small"
              onClick={() => {
                props.handleClickOpenAddBestWorkDialog();
                props.handleClose();
              }}
            />
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.square}></span>
              </Grid>
              <Grid item>
                <p>何が困難だったか</p>
              </Grid>
            </Grid>

            <Typography color="textSecondary">
              {returnCodeToBr(selectedBestWork.whatWasDifficult)}
            </Typography>
            <Divider className={classes.dividerBlack} />
          </div>

          <div className={classes.textContainer}>
            <CreateButton
              size="small"
              onClick={() => {
                props.handleClickOpenAddBestWorkDialog();
                props.handleClose();
              }}
            />
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.square}></span>
              </Grid>
              <Grid item>
                <p>なぜ解決しようと思ったか</p>
              </Grid>
            </Grid>

            <Typography color="textSecondary">
              {returnCodeToBr(selectedBestWork.whatImakeUseOftheBestWork)}
            </Typography>
            <Divider className={classes.dividerBlack} />
          </div>

          <div className={classes.textContainer}>
            <CreateButton
              size="small"
              onClick={() => {
                props.handleClickOpenAddBestWorkDialog();
                props.handleClose();
              }}
            />
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.square}></span>
              </Grid>
              <Grid item>
                <p>何を得たか</p>
              </Grid>
            </Grid>

            <Typography color="textSecondary">
              {returnCodeToBr(selectedBestWork.whatIGot)}
            </Typography>
            <Divider className={classes.dividerBlack} />
          </div>

          <div className={classes.textContainer}>
            <CreateButton
              size="small"
              onClick={() => {
                props.handleClickOpenAddBestWorkDialog();
                props.handleClose();
              }}
            />
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.square}></span>
              </Grid>
              <Grid item>
                <p>何に活かせるか</p>
              </Grid>
            </Grid>

            <Typography color="textSecondary">
              {returnCodeToBr(selectedBestWork.whatImakeUseOftheBestWork)}
            </Typography>
            <Divider className={classes.dividerBlack} />
          </div> */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SelectedBestWork;
