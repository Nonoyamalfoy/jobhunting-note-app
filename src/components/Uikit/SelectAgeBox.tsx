import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel, Grid } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    // marginBottom: 16,
    // minWidth: 120,
    width: "100%",
    maxHeight: 300
  },
  box: {
    // width: 16,
    height: 16,
    display: "block",
    // marginLeft: 6,
    borderRadius: 4,
  },
  icon: {
    margin: "0 auto",
  },
}));

type Props = {
  value: string | number;
  label: string;
  required?: boolean;
  options: any;
  select: (e: any) => void;
  unit: string
};

const SelectAgeBox: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        value={props.value}
        required={props.required}
        onChange={(e) => props.select(e.target.value)}
      >
        {props.options.map((value: any) => {
          return (
            <MenuItem key={value} value={value}>
              {value + props.unit}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SelectAgeBox;
