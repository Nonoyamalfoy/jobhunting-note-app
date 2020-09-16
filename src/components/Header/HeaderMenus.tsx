import React, { useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuIcoon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/styles";
import { Navigation } from "./index";

const useStyles = makeStyles({
  headerMenus: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconButton: {
    marginRight: "10px",
    display: "flex",
  },
  icon: {
    color: "white",
  },
});

type Props = {
  handleDrawerToggle: (event: any) => void;
};

const HeaderMenus = (props: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.headerMenus}>
      <Navigation />
      <div className={classes.iconButton}>
        <IconButton onClick={(e) => props.handleDrawerToggle(e)}>
          <MenuIcoon className={classes.icon} />
        </IconButton>
      </div>
    </div>
  );
};

export default HeaderMenus;
