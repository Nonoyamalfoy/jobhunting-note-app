import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  makeStyles,
  Divider,
} from "@material-ui/core";
import { CloseButton, MoreButton } from "../Uikit";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { CreateButton } from "../Uikit";
import { BestWork, Experience } from "../../entity/user";
import HTMLReactParser from "html-react-parser";
import { db } from "../../firebase/index";
import { useSelector } from "react-redux";
import { RootState } from "../../entity/rootState";
import { getUserId } from "../../reducks/user/selectors";

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
  rectangle: {
    width: 8,
    height: 16,
    display: "block",
    borderRadius: "20%",
    backgroundColor: "rgba(0, 0, 0, 0.30)",
  },
});

type Props = {
  open: boolean;
  handleClose: () => void;
  handleClickOpenAddExperienceDialog: () => void;
  selectedExperience: Experience;
};

const SelectedExperience: React.FC<Props> = (props) => {
  const classes = useStyles();
  const selector = useSelector((state: RootState) => state);
  const uid = getUserId(selector);
  const selectedExperience = props.selectedExperience;
  const matches = useMediaQuery("(max-width:960px)");
  const schrollType = matches ? "paper" : "body";

  const removeExperience = (experienceId: string) => {
    db.collection("users")
      .doc(uid)
      .collection("experiences")
      .doc(experienceId)
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
        maxWidth="sm"
      >
        <div className={classes.dialogHeader}>
          <Typography>{selectedExperience.title}</Typography>
          <DialogActions>
            <MoreButton
              color="white"
              size="small"
              onClickEdit={() => {
                props.handleClickOpenAddExperienceDialog();
                props.handleClose();
              }}
              onClickRemove={() => {
                removeExperience(selectedExperience.experienceId);
                props.handleClose();
              }}
            />
            <CloseButton onClick={props.handleClose} />
          </DialogActions>
        </div>

        <DialogContent>
          <div className="module-spacer--medium" />

          <div >
            <Grid item container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.rectangle}></span>
              </Grid>
              <Grid item>
                <Typography>年齢</Typography>
              </Grid>
            </Grid>
            <Typography color="textSecondary">
              {`${selectedExperience.age}歳`}
            </Typography>
            <Divider />
            <div className="module-spacer--medium" />

            <Grid item container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.rectangle}></span>
              </Grid>
              <Grid item>
                <Typography>モチベーション</Typography>
              </Grid>
            </Grid>
            <Typography color="textSecondary">
              {`${selectedExperience.motivation}%`}
            </Typography>
            <Divider />
            <div className="module-spacer--medium" />

            <Grid item container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.rectangle}></span>
              </Grid>
              <Grid item>
                <Typography>概要</Typography>
              </Grid>
            </Grid>
            <Typography color="textSecondary">
              {returnCodeToBr(selectedExperience.description)}
            </Typography>
            <Divider />
            <div className="module-spacer--medium" />

          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SelectedExperience;
