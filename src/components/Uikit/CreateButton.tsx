import React from "react";
import CreateIcon from "@material-ui/icons/Create";
import { IconButton } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    medium: {
      backgroundColor: "#20295f",
      color: "white",
      position: "fixed",
      bottom: "20px",
      right: "20px",
      zIndex: 10,
      boxShadow: "0 3px 5px rgba(0,0,0,0.5)",
      "&:hover": {
        backgroundColor: "#20295f",
        color: "grey",
      },
      [theme.breakpoints.up(1100)]: {
        right: "calc(50% - 520px)",
        bottom: "80px",
        transform: "translateX(50%)",
      },
    },
    small: {
      position: "absolute",
      // color: "rgba(0, 0, 0, 0.30)",
      top: 20,
      right: 10,
    },
  })
);

type Props = {
  onClick: () => void;
  size: "medium" | "small";
};

const CreateButton: React.FC<Props> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  let style;
  if (props.size === "small") {
    style = classes.small;
  } else {
    style = classes.medium;
  }
  return (
    <IconButton
      className={style}
      size={props.size}
      onClick={() => dispatch(props.onClick)}
    >
      <CreateIcon />
    </IconButton>
  );
};

export default CreateButton;
