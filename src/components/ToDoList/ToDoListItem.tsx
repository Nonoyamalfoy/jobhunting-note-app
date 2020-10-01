import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import MoreVertButton from "../Uikit/MoreButton";
import { ListItemSecondaryAction } from "@material-ui/core";
import { ToDo } from "../../entity/user";
import { db } from "../../firebase/index";
import { getUserId } from "../../reducks/user/selectors";
import { RootState } from "../../entity/rootState";
import dayjs from "dayjs";

const useStyles = makeStyles((theme: Theme) => ({
  toDoListItemContainer: {
    margin: "0 16px",
    backgroundColor: "white",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    transition: "all 0.3s",
    "&:hover": {
      boxShadow:
        "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
      transform: "translateY(-3px)",
    },
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

type Props = {
  toDo: ToDo;
  handleClickOpenAddToDoDialog: (t: ToDo) => void;
};

const ToDoListItem: React.FC<Props> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const uid = getUserId(selector);
  const toDo = props.toDo;

  const removeToDo = (toDoListId: string) => {
    db.collection("users")
      .doc(uid)
      .collection("toDoList")
      .doc(toDoListId)
      .delete();
  };

  const toggleCompleted = (toDoId: string, completed: boolean) => {
    db.collection("users")
      .doc(uid)
      .collection("toDoList")
      .doc(toDoId)
      .set({ completed: !completed }, { merge: true });
  };

  return (
    <>
      <div className={classes.toDoListItemContainer}>
        <ListItem
          className={classes.toDoListItem}
          role={undefined}
          dense
          button
          onClick={() => toggleCompleted(toDo.toDoId, toDo.completed)}
        >
          <ListItemIcon>
            <Checkbox
              className={classes.checkBox}
              size="medium"
              color="primary"
              edge="start"
              checked={toDo.completed}
            />
          </ListItemIcon>
          <ListItemText
            className={toDo.completed ? classes.doneText : classes.text}
            primary={toDo.title}
            secondary={dayjs(toDo.deadline).format("YYYY/MM/DD HH:mm")}
          />
          <ListItemSecondaryAction>
            <MoreVertButton
              size="medium"
              onClickEdit={() =>
                props.handleClickOpenAddToDoDialog({
                  toDoId: toDo.toDoId,
                  title: toDo.title,
                  deadline: toDo.deadline,
                  completed: toDo.completed,
                })
              }
              onClickRemove={() => removeToDo(toDo.toDoId)}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </div>
      <div className="module-spacer--small" />
    </>
  );
};

export default ToDoListItem;
