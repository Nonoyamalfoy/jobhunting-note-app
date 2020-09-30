import React, { useState } from "react";
import { IconButton, Menu, MenuItem, makeStyles } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const useStyles = makeStyles({
  white: {
    color: "white"
  }
})

type Props = {
  color?: string
  size: "small" | "medium";
  className?: string;
  onClickEdit: () => void;
  onClickRemove: () => void;
};

const MoretButton: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let color
  if(props.color === "white") {
    color = classes.white
  }

  return (
    <>
      <IconButton size={props.size} onClick={handleClick}>
        <MoreHorizIcon className={color} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            props.onClickEdit();
            handleClose();
          }}
        >
          編集
        </MenuItem>
        <MenuItem
          onClick={() => {
            props.onClickRemove();
            handleClose();
          }}
        >
          削除
        </MenuItem>
      </Menu>
    </>
  );
};

export default MoretButton;
