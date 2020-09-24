import React from "react";
import { Line } from "react-chartjs-2";

import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles,
  Grid,
  Divider,
} from "@material-ui/core";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: "50%",
    // marginBottom: 8,
    backgroundColor: "#20295f",
    boxShadow: "0 3px 5px rgba(0,0,0,0.5)",
    "& span": {
      color: "#fff",
      margin: "0 auto",
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
    padding: 0
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
}));

const myMotivations = [
  { title: "テニスと出会う", age: 5, motivation: 5 },
  { title: "怪我により２ヶ月間のドクターストップ", age: 10, motivation: 30 },
  { title: "復帰後の引退試合でメンバー入り", age: 15, motivation: 9 },
  { title: "志望大学に落ちる", age: 16, motivation: 80 },
  { title: "タイに旅行に行き、海外の魅力に気づく", age: 18, motivation: -30 },
  { title: "一週間の旅に出る", age: 20, motivation: 40 },
  { title: "帰国後現実とのギャップに苦しむ", age: 21, motivation: 10 },
  { title: "学生団体での活動に打ち込む", age: 22, motivation: 70 },
];

const getTitles = () => {
  const array = [];
  for (let i = 0; i < myMotivations.length; i++) {
    array[i] = myMotivations[i].title;
  }
  return array;
};

const getAges = () => {
  const array = [];
  for (let i = 0; i < myMotivations.length; i++) {
    array[i] = myMotivations[i].age;
  }
  return array;
};

const getMotivations = () => {
  const array = [];
  for (let i = 0; i < myMotivations.length; i++) {
    array[i] = myMotivations[i].motivation;
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

const MotivationGraph: React.FC = () => {
  const classes = useStyles();
  return (
    <div>
      <Line data={data} options={options} />

      <div className="module-spacer--medium"/>
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
            {myMotivations.map((motivation, i) => (
              <TimelineItem className={classes.timelineItem}>
                <TimelineSeparator>
                  <div className={classes.circle}>
                    <span>{motivation.age}</span>
                  </div>
                  {i !== myMotivations.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Typography color="textSecondary">
                    {motivation.title}
                  </Typography>
                  <Divider />
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </AccordionDetails>
      </Accordion>
      <Divider className={classes.dividerBlack} />

    </div>
  );
};

export default MotivationGraph;
