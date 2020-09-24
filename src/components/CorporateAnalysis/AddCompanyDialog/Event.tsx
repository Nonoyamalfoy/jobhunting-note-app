import React from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  makeStyles,
  Button,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { TextInput } from "../../Uikit";
import { DatePicker } from "@material-ui/pickers";
import {Event as IEvent} from "../../../entity/company"

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
  rectangle: {
    width: 8,
    height: 16,
    display: "block",
    borderRadius: "20%",
    backgroundColor: "rgba(0, 0, 0, 0.30)",
  },
});


type Props = {
  addEvent: () => void;
  events: IEvent[];
  inputEvent: any;
};

const Event: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <>
      <Accordion defaultExpanded className={classes.Accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          className={classes.AccordionSummary}
        >
          <Typography>面接・試験日程</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.AccordionDetails}>
          
          {props.events.map((event, i) => (
            <React.Fragment key={i}>
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <span className={classes.rectangle}></span>
                </Grid>
                <Grid item>
                  <p>{`日程 ${i + 1}`}</p>
                </Grid>
              </Grid>
              <Grid container key={i}>
                <Grid item container>
                  <Grid item xs={6}>
                    <DatePicker
                      value={event.eventDate}
                      label="日程"
                      onChange={(e) => props.inputEvent({ eventDate: e }, i)}
                      variant="inline"
                      format="YYYY/MM/DD"
                      animateYearScrolling
                      disableToolbar
                      fullWidth
                      inputProps={{ style: { fontSize: 17 } }}
                      InputLabelProps={{ style: { fontSize: 17 } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextInput
                      label={"概要"}
                      multiline={false}
                      required={true}
                      value={event.eventDescription}
                      type={"text"}
                      onChange={(e) =>
                        props.inputEvent(
                          { eventDescription: e.target.value },
                          i
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextInput
                      label={"場所"}
                      multiline={false}
                      required={true}
                      value={event.eventLocation}
                      type={"text"}
                      onChange={(e) =>
                        props.inputEvent({ eventLocation: e.target.value }, i)
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </React.Fragment>
          ))}

          <div className="module-spacer--small" />
          <Button onClick={props.addEvent} fullWidth variant="outlined">
            日程を追加
          </Button>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Event;
