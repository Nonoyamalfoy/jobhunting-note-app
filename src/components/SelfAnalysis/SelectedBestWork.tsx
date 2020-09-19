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
import { CreateButton } from "../Uikit";

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
    padding: "8px 16px 16px 16px",
    position: "relative",
  },
});

type Props = {
  open: boolean;
  handleClose: () => void;
  handleClickOpenAddBestWorkDialog: () => void;
};

const SelectedBestWork: React.FC<Props> = (props) => {
  const classes = useStyles();

  const matches = useMediaQuery("(max-width:960px)");
  const schrollType = matches ? "paper" : "body";
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
            <MoreButton
              size="small"
              onClickEdit={() => {
                props.handleClickOpenAddBestWorkDialog();
                props.handleClose();
              }}
              onClickRemove={props.handleClose}
            />
            <CloseButton onClick={props.handleClose} />
          </DialogActions>
        </div>

        <DialogContent>
          <div className={classes.textContainer}>
            <CreateButton size="small" onClick={() => {
              props.handleClickOpenAddBestWorkDialog()
              props.handleClose()
            }} />
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.square}></span>
              </Grid>
              <Grid item>
                <p>何をやったか(行動と結果)</p>
              </Grid>
            </Grid>

            <Typography color="textSecondary">
              行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果
            </Typography>
            <Divider className={classes.dividerBlack} />
          </div>

          <div className={classes.textContainer}>
            <CreateButton size="small" onClick={() => {
              props.handleClickOpenAddBestWorkDialog()
              props.handleClose()
            }} />
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.square}></span>
              </Grid>
              <Grid item>
                <p>何が困難だったか</p>
              </Grid>
            </Grid>

            <Typography color="textSecondary">
              行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果
            </Typography>
            <Divider className={classes.dividerBlack} />
          </div>

          <div className={classes.textContainer}>
            <CreateButton size="small" onClick={() => {
              props.handleClickOpenAddBestWorkDialog()
              props.handleClose()
            }} />
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.square}></span>
              </Grid>
              <Grid item>
                <p>なぜ解決しようと思ったか</p>
              </Grid>
            </Grid>

            <Typography color="textSecondary">
              行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果
            </Typography>
            <Divider className={classes.dividerBlack} />
          </div>

          <div className={classes.textContainer}>
            <CreateButton size="small" onClick={() => {
              props.handleClickOpenAddBestWorkDialog()
              props.handleClose()
            }} />
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.square}></span>
              </Grid>
              <Grid item>
                <p>何を得たか</p>
              </Grid>
            </Grid>

            <Typography color="textSecondary">
              行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果
            </Typography>
            <Divider className={classes.dividerBlack} />
          </div>

          <div className={classes.textContainer}>
            <CreateButton size="small" onClick={() => {
              props.handleClickOpenAddBestWorkDialog()
              props.handleClose()
            }} />
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.square}></span>
              </Grid>
              <Grid item>
                <p>何に活かせるか</p>
              </Grid>
            </Grid>

            <Typography color="textSecondary">
              行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果行動と結果
            </Typography>
            <Divider className={classes.dividerBlack} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SelectedBestWork;
