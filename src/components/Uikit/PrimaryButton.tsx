import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import { Dispatch, AnyAction } from "redux";

const useStyles = makeStyles({
  primaryButton: {
    backgroundColor: "#20295f",
    color: "white",
    fontSize: 16,
    height: 48,
    marginButton: 16,
    width: 256,
    "&:hover": {
      backgroundColor: "#20295f",
      color: "grey",
    },
  },
});

type Props = {
  onClick: () => void;
  label: string;
};

const PrimaryButton = (props: Props) => {
  const classes = useStyles();
  return (
    <Button
      className={classes.primaryButton}
      variant="contained"
      onClick={() => props.onClick()}
    >
      {props.label}
    </Button>
  );
};

export default PrimaryButton;
