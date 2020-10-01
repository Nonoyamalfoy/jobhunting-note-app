import React, { useState } from "react";
import { AddToDoDialog, ToDoListItem } from "../components/ToDoList";
// import { AddToDoDialog, ToDoListItem } from "../components/ToDoList";
import { useDispatch, useSelector } from "react-redux";
import List from "@material-ui/core/List";
import { CreateButton, DeleteCircleButton } from "../components/Uikit";
import { getToDoList, getUserId } from "../reducks/user/selectors";
import { RootState } from "../entity/rootState";
import { ToDo } from "../entity/user";
import dayjs from "dayjs";
import { db } from "../firebase/index";

const ToDoList: React.FC = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const uid = getUserId(selector);
  const ToDoList = getToDoList(selector);
  const completedToDoList = ToDoList.filter((toDo) => toDo.completed === true);

  const [toDo, setToDo] = useState({} as ToDo);

  const [addToDoDialogOpen, setAddToDoDialogOpen] = useState(false);

  const handleClickOpenAddToDoDialog = (t: ToDo) => {
    setToDo(t);
    setAddToDoDialogOpen(true);
  };
  const handleCloseAddToDoDialog = () => {
    setAddToDoDialogOpen(false);
  };

  const removeCompletedToDoList = (completedToDoList: ToDo[]) => {
    completedToDoList.map((completedToDo) => {
      db.collection("users")
        .doc(uid)
        .collection("toDoList")
        .doc(completedToDo.toDoId)
        .delete();
    });
  };

  return (
    <div className="p-ToDo">
      {/* <div className="module-spacer--extra-small"/> */}
      <List>
        {ToDoList.length > 0 ? (
          <>
          {ToDoList.map((t, i) => (
            <ToDoListItem
              key={i}
              toDo={t}
              handleClickOpenAddToDoDialog={handleClickOpenAddToDoDialog}
            />
          ))}
          </>
        ) : (
          <h2 className="empty-item">追加されたToDoはありません</h2>
        )}
      </List>
      <AddToDoDialog
        open={addToDoDialogOpen}
        handleClose={handleCloseAddToDoDialog}
        toDo={toDo}
      />
      <CreateButton
        size="medium"
        onClick={() =>
          handleClickOpenAddToDoDialog({
            toDoId: "",
            title: "",
            deadline: dayjs().format("YYYYMMDDHHmm"),
            completed: false,
          })
        }
      />

      {completedToDoList.length > 0 && (
        <DeleteCircleButton
          onClick={() => removeCompletedToDoList(completedToDoList)}
        />
      )}
    </div>
  );
};
export default ToDoList;
