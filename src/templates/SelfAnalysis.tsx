import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  makeStyles,
  Card,
  CardActions,
  Button,
  CardContent,
  CardActionArea,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import {
  AddBestWork,
  AddStrengthsAndWeaknessesDialog,
  MotivationGraph,
  SelectedBestWork,
} from "../components/SelfAnalysis";
import { CreateButton } from "../components/Uikit";
import {
  getUserId,
  getBestWorks,
  getStrengths,
  getWeaknesses,
} from "../reducks/user/selectors";
import { useSelector } from "react-redux";
import { RootState } from "../entity/rootState";
import { BestWork } from "../entity/user";
import HTMLReactParser from "html-react-parser";

const useStyles = makeStyles((theme) => ({
  mainCard: {
    margin: "16px 0px",
  },
  textContainer: {
    padding: "8px 16px 16px 16px",
    position: "relative",
  },
  square: {
    display: "block",
    width: 16,
    height: 16,
    borderRadius: "20%",
    backgroundColor: "#20295f",
  },

  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
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
    padding: "8px 0px 16px 0px",
    // backgroundColor: "#dfe3e7",
  },
  dividerBlack: {
    marginTop: 16,
    backgroundColor: "rgba(0, 0, 0, 0.54)",
  },
  cardActionArea: {
    height: "100%",
  },
  subCard: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 100,
    backgroundColor: "#dfe3e7",
    transition: "all 0.3s",
    "&:hover": {
      boxShadow:
        "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
      transform: "translateY(-3px)",
    },
  },
  addCircleIcon: {
    position: "absolute",
    top: 20,
    right: 10,
  },
}));

const returnCodeToBr = (text: string) => {
  if (text === "") {
    return text;
  } else {
    return HTMLReactParser(text.replace(/\r?\n/g, "<br/>"));
  }
};

const SelfAnalysis: React.FC = () => {
  const classes = useStyles();
  const selector = useSelector((state: RootState) => state);
  const strengths = getStrengths(selector);
  const weaknesses = getWeaknesses(selector);
  const bestWorks = getBestWorks(selector);

  const [selectedBestWorkDialogopen, setSelectedBestWorkDialogopen] = useState(
    false
  );
  const [
    addStrengthsAndWeaknessesOpen,
    setAddStrengthsAndWeaknessesOpen,
  ] = useState(false);

  const [addBestWorkDialogopen, setAddBestWorkDialogopen] = useState(false);

  const [bestWork, setBestWork] = useState({
    bestWorkId: "",
    title: "",
    whatIDid: "",
    whatWasDifficult: "",
    whatIGot: "",
    reasonsForWorking: "",
    whatImakeUseOftheBestWork: "",
  } as BestWork);

  const resetBestWork = () => {
    setBestWork({
      bestWorkId: "",
      title: "",
      whatIDid: "",
      whatWasDifficult: "",
      whatIGot: "",
      reasonsForWorking: "",
      whatImakeUseOftheBestWork: "",
    });
  };

  // Select

  const handleClickOpenSelectedBestWorkDialog = (b: BestWork) => {
    setBestWork(b);
    setSelectedBestWorkDialogopen(true);
  };
  const handleCloseSelectedBestWorkDialog = () => {
    setSelectedBestWorkDialogopen(false);
  };

  // OpenAddDialog
  const handleClickOpenAddStrengthsAndWeaknessesDialog = () => {
    setAddStrengthsAndWeaknessesOpen(true);
  };

  const handleClickOpenAddBestWorkDialog = () => {
    setAddBestWorkDialogopen(true);
  };

  // CloseAddDialog
  const handleCloseAddStrengthsAndWeaknessesDialog = () => {
    setAddStrengthsAndWeaknessesOpen(false);
  };

  const handleCloseAddBestWorkDialog = () => {
    resetBestWork();
    setAddBestWorkDialogopen(false);
  };

  return (
    <>
      <Card className={classes.mainCard} elevation={5}>
        <CardContent>
          <div className={classes.textContainer}>
            <CreateButton
              size="small"
              onClick={handleClickOpenAddStrengthsAndWeaknessesDialog}
            />
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.square}></span>
              </Grid>
              <Grid item>
                <p>自分の強み</p>
              </Grid>
            </Grid>
            <Typography color="textSecondary">
              {returnCodeToBr(strengths)}
            </Typography>
            <Divider className={classes.dividerBlack} />
          </div>

          <div className={classes.textContainer}>
            <CreateButton
              size="small"
              onClick={handleClickOpenAddStrengthsAndWeaknessesDialog}
            />
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.square}></span>
              </Grid>
              <Grid item>
                <p>自分の弱み</p>
              </Grid>
            </Grid>
            <Typography color="textSecondary">
              {returnCodeToBr(weaknesses)}
            </Typography>

            <Divider className={classes.dividerBlack} />
          </div>
        </CardContent>
      </Card>

      <Card className={classes.mainCard} elevation={5}>
        <CardContent>
          <MotivationGraph />
        </CardContent>
      </Card>

      <Card className={classes.mainCard} elevation={5}>
        <CardContent>
          <div className={classes.textContainer}>
            <IconButton
              className={classes.addCircleIcon}
              size="small"
              onClick={() => {
                handleClickOpenAddBestWorkDialog();
                resetBestWork();
              }}
            >
              <AddCircleOutlineIcon />
            </IconButton>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.square}></span>
              </Grid>
              <Grid item>
                <p>学生時代に頑張ったこと</p>
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              {bestWorks.map((bestWork: BestWork, i: number) => (
                <Grid key={i} item xs={12} sm={6} md={4}>
                  <Card className={classes.subCard}>
                    <CardActionArea
                      className={classes.cardActionArea}
                      onClick={() =>
                        handleClickOpenSelectedBestWorkDialog(bestWork)
                      }
                    >
                      <CardContent>
                        <Typography gutterBottom variant="subtitle1">
                          {bestWork.title}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </CardContent>
      </Card>

      <AddStrengthsAndWeaknessesDialog
        open={addStrengthsAndWeaknessesOpen}
        handleClose={handleCloseAddStrengthsAndWeaknessesDialog}
      />
      <AddBestWork
        open={addBestWorkDialogopen}
        handleClose={handleCloseAddBestWorkDialog}
        bestWork={bestWork}
      />

      <SelectedBestWork
        open={selectedBestWorkDialogopen}
        handleClickOpenAddBestWorkDialog={handleClickOpenAddBestWorkDialog}
        handleClose={handleCloseSelectedBestWorkDialog}
        selectedBestWork={bestWork}
      />
    </>
  );
};

export default SelfAnalysis;
