import React, { useState } from "react";
import { Line } from "react-chartjs-2";

import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles,
  Grid,
  Divider,
  IconButton,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useSelector } from "react-redux";
import { RootState } from "../../entity/rootState";
import { Experience } from "../../entity/user";
import { getExperiences } from "../../reducks/user/selectors";
import { SelectedExperience, AddExperienceDialog } from "./";

const useStyles = makeStyles((theme) => ({
  timeline: {
    [theme.breakpoints.down(1000)]: {
      padding: 0,
    },
  },
  timelineItem: {
    minHeight: 50,
    "&:before": {
      display: "none",
    },
  },
  paper: {
    padding: "6px 16px",
  },
  // secondaryTail: {
  //   backgroundColor: theme.palette.secondary.main,
  // },
  circle: {
    width: 24,
    height: 24,
    textAlign: "center",
    display: "flex",
    padding: 4,
    alignSelf: "baseline",
    // marginTop: "8px",
    // borderStyle: "solid",
    // borderWidth: 2,
    borderRadius: "50%",
    // marginBottom: 8,
    backgroundColor: "#20295f",
    boxShadow: "0 3px 5px rgba(0,0,0,0.5)",
    cursor: "pointer",
    color: "#fff",
    "& span": {
      margin: "0 auto",
    },
    "&:hover": {
      // backgroundColor: "#20295f",
      color: "grey",
    },
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
    padding: 0,
    // backgroundColor: "#dfe3e7",
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
  addCircleIcon: {
    position: "absolute",
    top: 20,
    right: 10,
  },
  textContainer: {
    padding: "8px 16px 16px 16px",
    position: "relative",
  },
  experienceTitle: {
    cursor: "pointer",
  },
}));

// type Props = {
//   handleClickOpenAddExperienceDialog: (age: number) => void;
// };

const MotivationGraph: React.FC = () => {
  const classes = useStyles();
  const selector = useSelector((state: RootState) => state);
  const experiences = getExperiences(selector).sort((a, b) =>
    a.age > b.age ? 1 : -1
  );
  // const [age, setAge] = useState(0);
  const [experience, setExperience] = useState<Experience>({
    experienceId: "",
    title: "",
    age: 0,
    motivation: 0,
    description: "",
  });
  const [addMotivationDialogOpen, setAddMotivationDialogOpen] = useState(false);
  const [
    selectedExperienceDialogOpen,
    setSelectedExperienceDialogOpen,
  ] = useState(false);

  const resetExperience = () => {
    setExperience({
      experienceId: "",
      title: "",
      age: 0,
      motivation: 0,
      description: "",
    });
  };

  // SelectDialog
  const handleClickOpenSelectedExperienceDialog = (e: Experience) => {
    setExperience(e);
    setSelectedExperienceDialogOpen(true);
  };
  const handleCloseSelectedExperienceDialog = () => {
    setSelectedExperienceDialogOpen(false);
  };

  // AddDialog
  const handleClickOpenAddExperienceDialog = () => {
    setAddMotivationDialogOpen(true);
  };
  const handleCloseAddMotivationDialog = () => {
    setAddMotivationDialogOpen(false);
  };

  const getTitles = () => {
    const array = [];
    for (let i = 0; i < experiences.length; i++) {
      array[i] = experiences[i].title;
    }
    return array;
  };

  const getAges = () => {
    const array = [];
    for (let i = 0; i < experiences.length; i++) {
      array[i] = experiences[i].age;
    }
    return array;
  };

  const getMotivations = () => {
    const array = [];
    for (let i = 0; i < experiences.length; i++) {
      array[i] = experiences[i].motivation;
    }
    return array;
  };

  const data = {
    labels: getAges(),
    datasets: [
      {
        label: "モチベーション",
        // backgroundColor: "#008080",
        borderColor: "#20295f",
        pointBorderWidth: 10,
        data: getMotivations(),
      },
    ],
  };

  const options = {
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            display: false,
            beginAtZero: true,
            max: 100,
          },
        },
      ],
    },
    tooltips: {
      displayColors: false,
      callbacks: {
        title: (tooltipItems: any, data: any) => "",
        beforeLabel: (tooltipItems: any, data: any) => {
          return `${getAges()[tooltipItems.index]}歳`;
        },
        label: (tooltipItems: any, data: any) => {
          return getTitles()[tooltipItems.index];
        },
      },
    },
  };

  return (
    <>
      <Grid className={classes.textContainer}>
        <IconButton
          className={classes.addCircleIcon}
          size="small"
          onClick={() => {
            resetExperience();
            handleClickOpenAddExperienceDialog();
          }}
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
        <Line data={data} options={options} />

        <div className="module-spacer--medium" />
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
                <Typography>自分史</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails className={classes.AccordionDetails}>
            <Timeline className={classes.timeline}>
              {experiences.map((experience, i) => (
                <TimelineItem key={i} className={classes.timelineItem}>
                  <TimelineSeparator>
                    <div
                      className={classes.circle}
                      onClick={() =>
                        handleClickOpenSelectedExperienceDialog(experience)
                      }
                    >
                      <span>{experience.age}</span>
                    </div>
                    {i !== experiences.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography
                      className={classes.experienceTitle}
                      color="textSecondary"
                      onClick={() =>
                        handleClickOpenSelectedExperienceDialog(experience)
                      }
                    >
                      {experience.title}
                    </Typography>
                    <Divider />
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </AccordionDetails>
        </Accordion>
        <Divider className={classes.dividerBlack} />

        <AddExperienceDialog
          experience={experience}
          open={addMotivationDialogOpen}
          handleClose={handleCloseAddMotivationDialog}
        />
        <SelectedExperience
          open={selectedExperienceDialogOpen}
          handleClickOpenAddExperienceDialog={
            handleClickOpenAddExperienceDialog
          }
          handleClose={handleCloseSelectedExperienceDialog}
          selectedExperience={experience}
        />
      </Grid>
    </>
  );
};

export default MotivationGraph;
