import React, { useEffect } from "react";
import { IconButton, Toolbar } from "@material-ui/core";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import { useDispatch, useSelector } from "react-redux";
import {
  setPreviousMonth,
  setNextMonth,
} from "../../reducks/calendar/operations";
import { DatePicker } from "@material-ui/pickers";
// import { getCurrentDate } from "../../reducks/calendar/selectors";
// import {setDate} from "../../reducks/calendar/oeprations";
import { makeStyles } from "@material-ui/styles";
import dayjs from "dayjs";
import { RootState } from "../../type/rootState";
import { getCurrentDate } from "../../reducks/calendar/selector";
import { setCurrentDate } from "../../reducks/calendar/operations";

const useStyles = makeStyles({
  toolBar: {
    marginLeft: 10,
    padding: 0,
  },
  datePicker: {
    width: 110,
    transform: "scale(0.9)",
  },
  arrowButton: {
    color: "white",
  },
});

const Navigation: React.FC = () => {
  const classes = useStyles();
  const selector = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  // const currentDate = getCurrentDate(selector);
  const query = selector.router.location.pathname;
  const onCalendarPage = query.endsWith("calendar");
  const currentDate = getCurrentDate(selector);

  useEffect(() => {
    dispatch(setCurrentDate(dayjs()));
  }, []);

  return (
    <Toolbar className={classes.toolBar}>
      <IconButton onClick={() => dispatch(setPreviousMonth())}>
        <ArrowBackIos className={classes.arrowButton} />
      </IconButton>
      <DatePicker
        InputProps={{
          style: { fontSize: 20, color: "white" },
          disableUnderline: true,
        }}
        InputLabelProps={{ style: { fontSize: 20, color: "white" } }}
        className={classes.datePicker}
        value={currentDate}
        onChange={(e) => dispatch(setCurrentDate(e as dayjs.Dayjs))}
        variant="inline"
        format="YYYY/MM/DD"
        animateYearScrolling
        disableToolbar
      />
      <IconButton onClick={() => dispatch(setNextMonth())}>
        <ArrowForwardIos className={classes.arrowButton} />
      </IconButton>
    </Toolbar>
  );
};

export default Navigation;
