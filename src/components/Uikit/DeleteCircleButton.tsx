import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {useDispatch} from "react-redux";

const useStyles = makeStyles((theme: Theme) => createStyles({
  delete: {
    backgroundColor: "#20295f",
    color: "white",
    position: "fixed",
    bottom: "20px",
    left: "20px",
    zIndex: 10,
    boxShadow: "0 3px 5px rgba(0,0,0,0.5)",
    "&:hover": {
      backgroundColor: "#20295f",
      color: "grey",
    },
    [theme.breakpoints.up(1100)]: {
      left: "calc(50% - 520px)",
      bottom: "80px",
      transform: "translateX(-50%)",
    },
  },
}))

type Props = {
  onClick: () => void
}

const DeleteCircleButton: React.FC<Props> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return(
    <IconButton 
      className={classes.delete}  
      size="medium" 
      onClick={() => dispatch(props.onClick)}
    >
        <DeleteIcon />
    </IconButton>
  )
}

export default DeleteCircleButton;