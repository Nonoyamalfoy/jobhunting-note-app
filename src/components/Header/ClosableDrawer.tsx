import React from "react";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { signOut } from "../../reducks/user/operations";
import DateRangeIcon from "@material-ui/icons/DateRange";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
import HomeIcon from "@material-ui/icons/Home";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import BusinessIcon from "@material-ui/icons/Business";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  // toolbar: theme.mixins.toolbar,
  drawerList: {
    width: 250,
  },
}));

type Props = {
  open: boolean;
  handleDrawerToggle: (event: any) => void;
};

const ClosableDrawer: React.FC<Props> = ({open, handleDrawerToggle}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const selectMenu = (event: any, path: string) => {
    dispatch(push(path));
    handleDrawerToggle(event);
  };

  const menus = [
    // {
    //   func: selectMenu,
    //   label: "ホーム",
    //   icon: <HomeIcon />,
    //   id: "home",
    //   value: "/",
    // },
    {
      func: selectMenu,
      label: "企業分析",
      icon: <BusinessIcon />,
      id: "/corporate-analysis",
      value: "/corporate-analysis",
    },
    {
      func: selectMenu,
      label: "自己分析",
      icon: <AccountCircleIcon />,
      id: "self-analysis",
      value: "/self-analysis",
    },
    {
      func: selectMenu,
      label: "スケジュール",
      icon: <DateRangeIcon />,
      id: "calendar",
      value: "/calendar",
    },
    {
      func: selectMenu,
      label: "やることリスト",
      icon: <CheckBoxIcon />,
      id: "todoList",
      value: "/todo",
    },
  ];

  return (
    <nav>
      <Drawer
        variant="temporary"
        anchor="right"
        open={open}
        onClose={(e) => handleDrawerToggle(e)}
        ModalProps={{ keepMounted: true }}
      >
        <div
          // onClose={(e) => props.onClose(e)}
          onKeyDown={(e) => handleDrawerToggle(e)}
        >
          <Divider />
          <List className={classes.drawerList}>
            {menus.map((menu) => (
              <ListItem
                button
                key={menu.id}
                onClick={(e) => menu.func(e, menu.value)}
              >
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))}
            <ListItem
              button
              key="logout"
              onClick={(e) => {
                dispatch(signOut());
                handleDrawerToggle(e);
              }}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={"ログアウト"} />
            </ListItem>
          </List>
          <Divider />
        </div>
      </Drawer>
    </nav>
  );
};

export default ClosableDrawer;
