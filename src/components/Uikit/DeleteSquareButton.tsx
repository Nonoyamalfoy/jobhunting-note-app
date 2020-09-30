import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  button: {
    backgroundColor: "#20295f",
    color: "white",
    "&:hover": {
      backgroundColor: "#20295f",
      color: "grey",
    },
  },
});

type Props = {
  onClick: () => void;
};

const DeleteSquareButton: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <Button
      variant="outlined"
      color="secondary"
      // className={classes.button}
      onClick={() => props.onClick()}
    >
      削除
    </Button>
  );
};

export default DeleteSquareButton;
