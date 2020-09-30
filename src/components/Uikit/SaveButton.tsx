import React from "react";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
  saveButton: {
    backgroundColor: "#20295f",
    color: "white",
    "&:hover": {
      backgroundColor: "#20295f",
      color: "grey"
    },
  },
})

type Props = {
  onClick: () => void
}

const SaveButton: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <Button 
    variant="contained"
    // color="primary"
    className={classes.saveButton}
    onClick={() => props.onClick()}
    >
      保存
    </Button>
  )
}

export default SaveButton