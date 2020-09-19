import React, { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Theme } from "@material-ui/core/styles";
import dayjs from "dayjs";
// import { openAddToDoDialog } from "../../reducks/addToDo/operation";
import Checkbox from "@material-ui/core/Checkbox";
import MoreVertButton from "../Uikit/MoreButton";
// import { getUserId } from "../../reducks/users/selectors";
// import { toggleCompleted, removeToDo } from "../../services/ToDo";
import { ListItemSecondaryAction } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  toDoListItemContainer: {
    margin: "0 16px",
    backgroundColor: "white",
    boxShadow: "0 3px 5px rgba(0,0,0,0.5)",
    borderRadius: "4px",
    [theme.breakpoints.up(960)]: {
      margin: "0 auto",
    },
  },
  toDoListItem: {
    minHeight: 80,
  },
  checkBox: {
    padding: 12,
  },
  doneText: {
    textDecoration: "line-through",
    color: "rgba(0, 0, 0, 0.54)",
    wordWrap: "break-word",
    marginRight: 48,
  },
  text: {
    wordWrap: "break-word",
    marginRight: 48,
  },
}));

const ToDoItem: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const [completed, setCompleted] = useState(false);
  const toggleCompleted = () => {
    setCompleted(!completed)
  }

  return (
    <>
      <div className={classes.toDoListItemContainer}>
        <ListItem
          className={classes.toDoListItem}
          role={undefined}
          dense
          button
          onClick={toggleCompleted}
        >
          <ListItemIcon>
            <Checkbox
              className={classes.checkBox}
              size="medium"
              color="primary"
              edge="start"
              checked={completed}
            />
          </ListItemIcon>
          <ListItemText
            className={classes.text}
            primary="ヤフーES提出"
            secondary="2020年9月28日"
          />
          <ListItemSecondaryAction>
            <MoreVertButton
              size="medium"
              onClickEdit={() => {}}
              onClickRemove={() => {}}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </div>
      <div className="module-spacer--small" />
    </>
  );
};

export default ToDoItem;
