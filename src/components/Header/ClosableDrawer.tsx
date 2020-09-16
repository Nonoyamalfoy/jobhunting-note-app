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

const ClosableDrawer = (props: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const selectMenu = (event: any, path: string) => {
    dispatch(push(path));
    props.handleDrawerToggle(event);
  };

  const menus = [
    {
      func: selectMenu,
      label: "ホーム",
      icon: <HomeIcon />,
      id: "home",
      value: "/",
    },
    {
      func: selectMenu,
      label: "自己分析",
      icon: <AccountCircleIcon />,
      id: "todoList",
      value: "/todoList",
    },
    {
      func: selectMenu,
      label: "企業分析",
      icon: <BusinessIcon />,
      id: "company-list",
      value: "/company-list",
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
      value: "/todoList",
    },
  ];

  return (
    <nav>
      <Drawer
        variant="temporary"
        anchor="right"
        open={props.open}
        onClose={(e) => props.handleDrawerToggle(e)}
        ModalProps={{ keepMounted: true }}
      >
        <div
          // onClose={(e) => props.onClose(e)}
          onKeyDown={(e) => props.handleDrawerToggle(e)}
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
                props.handleDrawerToggle(e);
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