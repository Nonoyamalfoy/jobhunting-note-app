import React, { useState } from "react";
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
  AddMotivation,
  MotivationGraph,
  SelectedBestWork,
} from "../components/SelfAnalysis";
import { CreateButton } from "../components/Uikit";

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
  },
  addCircleIcon: {
    position: "absolute",
    top: 20,
    right: 10,
  },
}));

const SelfAnalysis: React.FC = () => {
  const classes = useStyles();
  const [selectedBestWorkDialogopen, setSelectedBestWorkDialogopen] = useState(
    false
  );
  const [addBestWorkDialogopen, setAddBestWorkDialogopen] = useState(false);
  const [addMotivationDialogOpen, setAddMotivationDialogOpen] = useState(false);
  const handleClickOpenSelectedBestWorkDialog = () => {
    setSelectedBestWorkDialogopen(true);
  };
  const handleCloseSelectedBestWorkDialog = () => {
    setSelectedBestWorkDialogopen(false);
  };
  const handleClickOpenAddBestWorkDialog = () => {
    setAddBestWorkDialogopen(true);
  };
  const handleCloseAddBestWorkDialog = () => {
    setAddBestWorkDialogopen(false);
  };
  const handleClickOpenAddMotivationDialog = () => {
    setAddMotivationDialogOpen(true);
  };
  const handleCloseAddMotivationDialog = () => {
    setAddMotivationDialogOpen(false);
  };
  return (
    <>
      <Card className={classes.mainCard} elevation={5}>
        <CardContent>
          <div className={classes.textContainer}>
            <CreateButton size="small" onClick={() => {}} />
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.square}></span>
              </Grid>
              <Grid item>
                <p>自分の強み</p>
              </Grid>
            </Grid>

            <Grid container justify="flex-start">
              <Grid item>
                <Typography color="textSecondary">・</Typography>
              </Grid>
              <Grid item xs={11}>
                <Typography color="textSecondary">
                  強みです強みです強みです強みです強みです強みです強みです
                </Typography>
              </Grid>
            </Grid>
            <Grid container justify="flex-start">
              <Grid item>
                <Typography color="textSecondary">・</Typography>
              </Grid>
              <Grid item xs={11}>
                <Typography color="textSecondary">
                  強みです強みです強みです強みです強みです強みです強みです
                </Typography>
              </Grid>
            </Grid>
            <Divider className={classes.dividerBlack} />
          </div>

          <div className={classes.textContainer}>
            <CreateButton size="small" onClick={() => {}} />
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.square}></span>
              </Grid>
              <Grid item>
                <p>自分の弱み</p>
              </Grid>
            </Grid>

            <Grid container justify="flex-start">
              <Grid item>
                <Typography color="textSecondary">・</Typography>
              </Grid>
              <Grid item xs={11}>
                <Typography color="textSecondary">
                  強みです強みです強みです強みです強みです強みです強みです強みです
                </Typography>
              </Grid>
            </Grid>
            <Grid container justify="flex-start">
              <Grid item>
                <Typography color="textSecondary">・</Typography>
              </Grid>
              <Grid item xs={11}>
                <Typography color="textSecondary">
                  強みです強みです強みです強みです強みです強みです強みです強みです
                </Typography>
              </Grid>
            </Grid>

            <Divider className={classes.dividerBlack} />
          </div>
        </CardContent>
      </Card>

      <Card className={classes.mainCard} elevation={5}>
        <CardContent>
          <Grid className={classes.textContainer}>
            <IconButton
              className={classes.addCircleIcon}
              size="small"
              onClick={handleClickOpenAddMotivationDialog}
            >
              <AddCircleOutlineIcon />
            </IconButton>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <span className={classes.square}></span>
              </Grid>
              <Grid item>
                <p>モチベーショングラフ</p>
              </Grid>
            </Grid>

            <MotivationGraph />
          </Grid>
        </CardContent>
      </Card>

      <Card className={classes.mainCard} elevation={5}>
        <CardContent>
          <div className={classes.textContainer}>
            <IconButton
              className={classes.addCircleIcon}
              size="small"
              onClick={handleClickOpenAddBestWorkDialog}
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
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.subCard} elevation={5}>
                  <CardActionArea
                    className={classes.cardActionArea}
                    onClick={handleClickOpenSelectedBestWorkDialog}
                  >
                    <CardContent>
                      <Typography gutterBottom variant="subtitle1">
                        バスケ部キャプテンとしてリーダーシップを発揮した
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.subCard} elevation={5}>
                  <CardActionArea
                    className={classes.cardActionArea}
                    onClick={handleClickOpenSelectedBestWorkDialog}
                  >
                    <CardContent>
                      <Typography gutterBottom variant="subtitle1">
                        ビジコンで最優秀賞を受賞
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
          </div>
        </CardContent>
      </Card>

      <SelectedBestWork
        open={selectedBestWorkDialogopen}
        handleClickOpenAddBestWorkDialog={handleClickOpenAddBestWorkDialog}
        handleClose={handleCloseSelectedBestWorkDialog}
      />
      <AddBestWork
        open={addBestWorkDialogopen}
        handleClose={handleCloseAddBestWorkDialog}
      />
      <AddMotivation
        open={addMotivationDialogOpen}
        handleClose={handleCloseAddMotivationDialog}
      />
    </>
  );
};

export default SelfAnalysis;
