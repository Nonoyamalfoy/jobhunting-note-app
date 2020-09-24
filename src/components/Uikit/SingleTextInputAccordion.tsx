import React from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { TextInput } from "./";

const useStyles = makeStyles({
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
    padding: "0px 16px 0px 0px",
    "& .MuiAccordionSummary-content": {
      margin: "17px 0px 7px 0px",
    },
  },
  AccordionDetails: {
    display: "block",
    backgroundColor: "#dfe3e7",
  },
});

type Props = {
  title: string;
  TextInputLabel: string;
  TextInputValue: string;
  TextInputOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SingleTextInputAccordion: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <>
      <Accordion defaultExpanded className={classes.Accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          className={classes.AccordionSummary}
        >
          <Typography>{props.title}</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.AccordionDetails}>
          <TextInput
            label={props.TextInputLabel}
            multiline={true}
            required={true}
            value={props.TextInputValue}
            type={"text"}
            onChange={props.TextInputOnChange}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default SingleTextInputAccordion;
