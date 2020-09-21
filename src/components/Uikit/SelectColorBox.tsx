import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {InputLabel, Grid} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: 16,
    minWidth: 120,
    width: "100%",
  },
  box: {
    width: 16,
    height: 16,
    display: "block",
    // marginLeft: 6,
    borderRadius: 4,
  },
  icon: {
    margin: "0 auto",
  },
}));

const setScheduleColor = (color: string) => {
  let scheduleColor;
  switch (color) {
    case "default":
      scheduleColor = "#000088";
      break;
    case "red":
      scheduleColor = "#880000";
      break;
    case "orange":
      scheduleColor = "#D2691E";
      break;
    case "green":
      scheduleColor = "#008800";
      break;
    default:
      break;
  }
  return scheduleColor;
};

const colors = [
  { id: "default", name: "default" },
  { id: "red", name: "red" },
  { id: "orange", name: "orange" },
  { id: "green", name: "green" },
];

type Props = {
  value: string
  label: string
  required?: boolean
  select: (e: any) => void
}

const SelectColorBox: React.FC<Props> = (props) => {
  const classes = useStyles();


  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        value={props.value}
        required={props.required}
        onChange={(e) => props.select(e.target.value)}
      >
        {colors.map((value: any) => {
          return (
            <MenuItem key={value.id} value={value.id}>
              <Grid container spacing={1} alignItems="center">
            <Grid item >
              <span
                style={{ backgroundColor: setScheduleColor(value.name) }}
                className={classes.box}
              ></span>
            </Grid>

            <Grid item >
              {value.name}
            </Grid>
          </Grid>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SelectColorBox;