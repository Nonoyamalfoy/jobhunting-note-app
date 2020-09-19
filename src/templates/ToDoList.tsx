import React, { useState } from "react";
import {AddToDoDialog, ToDoListItem} from "../components/ToDoList"
// import { AddToDoDialog, ToDoListItem } from "../components/ToDoList";
import { useDispatch, useSelector } from "react-redux";
import List from "@material-ui/core/List";
import { CreateButton } from "../components/Uikit";


const ToDoList: React.FC = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const [addToDoDialogOpen, setAddToDoDialogOpen] = useState(false);
  const handleClickOpenAddToDoDialog = () => {
    setAddToDoDialogOpen(true);
  };
  const handleCloseAddToDoDialog = () => {
    setAddToDoDialogOpen(false);
  };

  return (
    <div className="p-ToDo">
      
      {/* <div className="module-spacer--extra-small"/> */}
      <List >
        <ToDoListItem/>
        <ToDoListItem/>
        <ToDoListItem/>
      </List>
      <AddToDoDialog open={addToDoDialogOpen} handleClose={handleCloseAddToDoDialog}/>
      <CreateButton size="medium" onClick={handleClickOpenAddToDoDialog} />

    </div>
  );
};
export default ToDoList;
