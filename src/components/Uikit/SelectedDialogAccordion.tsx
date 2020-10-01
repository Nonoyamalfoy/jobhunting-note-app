import React from "react";
import {
  Typography,
  Grid,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

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
      minHeight: 57,
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
  title: string;
  onClick: () => void;
};

const SelectedDialogAccordion: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <>
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
              <Typography>{props.title}</Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails
          className={classes.AccordionDetails}
          onClick={props.onClick}
        >
          {props.children}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default SelectedDialogAccordion;
