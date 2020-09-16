import React, { useState } from "react";
import { IconButton, Menu, MenuItem, makeStyles } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const useStyles = makeStyles({
  icon: {
    color: "white"
  }
})

type Props = {
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

  return (
    <>
      <IconButton size={props.size} onClick={handleClick}>
        <MoreHorizIcon className={classes.icon} color="disabled"/>
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
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            props.onClickRemove();
            handleClose();
          }}
        >
          Remove
        </MenuItem>
      </Menu>
    </>
  );
};

export default MoretButton;
