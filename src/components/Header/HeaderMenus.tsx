import React, { useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuIcoon from "@material-ui/icons/Menu";
import Badge from "@material-ui/core/Badge";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { makeStyles } from "@material-ui/styles";
import { Navigation } from "./index";
import { RootState } from "../../entity/rootState";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserId,
  getToDoList,
  getSchedules,
  getCompanies,
  getBestWorks,
  getExperiences,
} from "../../reducks/user/selectors";
import { db } from "../../firebase/index";
import { Company } from "../../entity/company";
import {
  fetchToDoList,
  fetchSchedules,
  fetchBestWorks,
  fetchCompanies,
  setStrengthsAndWeaknesses,
  fetchExperiences,
} from "../../reducks/user/operations";
import { BestWork, Experience, Schedule, ToDo } from "../../entity/user";
import { push } from "connected-react-router";

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
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const uid = getUserId(selector);
  let experiences = getExperiences(selector);
  let toDoList = getToDoList(selector);
  let schedules = getSchedules(selector);
  let companies = getCompanies(selector);
  let bestWorks = getBestWorks(selector);
  const notCompletedToDoList = toDoList.filter(
    (toDo) => toDo.completed === false
  );

  const query = selector.router.location.pathname;
  const onCalendarPage = query.endsWith("calendar");

  // strengthAndWeaknesses
  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .where("uid", "==", uid)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const changeData = change.doc.data();
          if (change.type === "modified") {
            dispatch(
              setStrengthsAndWeaknesses({
                strengths: changeData.strengths,
                weaknesses: changeData.weaknesses,
              })
            );
          }
        });
      });
    return () => {
      unsubscribe();
    };
  }, []);

  // experience
  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(uid)
      .collection("experiences")
      .orderBy("age", "asc")
      .onSnapshot((sanpshots) => {
        sanpshots.docChanges().forEach((change) => {
          const experience = change.doc.data() as Experience;
          const changeType = change.type;
          switch (changeType) {
            case "added":
              experiences.push(experience);
              break;
            case "modified":
              const index = experiences.findIndex(
                (experience) => experience.experienceId === change.doc.id
              );
              experiences[index] = experience;
              break;
            case "removed":
              experiences = experiences.filter(
                (experience) => experience.experienceId !== change.doc.id
              );
              break;
            default:
              break;
          }
        });
        dispatch(fetchExperiences(experiences));
      });
    return () => {
      unsubscribe();
    };
  }, []);

  // ToDo
  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(uid)
      .collection("toDoList")
      .onSnapshot((sanpshots) => {
        sanpshots.docChanges().forEach((change) => {
          const ToDo = change.doc.data() as ToDo;
          const changeType = change.type;
          switch (changeType) {
            case "added":
              toDoList.push(ToDo);
              break;
            case "modified":
              const index = toDoList.findIndex(
                (toDo) => toDo.toDoId === change.doc.id
              );
              toDoList[index] = ToDo;
              break;
            case "removed":
              toDoList = toDoList.filter(
                (toDo) => toDo.toDoId !== change.doc.id
              );
              break;
            default:
              break;
          }
        });
        dispatch(fetchToDoList(toDoList));
      });
    return () => {
      unsubscribe();
    };
  }, []);

  // scheudule
  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(uid)
      .collection("schedules")
      .onSnapshot((sanpshots) => {
        sanpshots.docChanges().forEach((change) => {
          const schedule = change.doc.data() as Schedule;
          const changeType = change.type;
          switch (changeType) {
            case "added":
              schedules.push(schedule);
              break;
            case "modified":
              const index = schedules.findIndex(
                (schedule) => schedule.scheduleId === change.doc.id
              );
              schedules[index] = schedule;
              break;
            case "removed":
              schedules = schedules.filter(
                (schedule) => schedule.scheduleId !== change.doc.id
              );
              break;
            default:
              break;
          }
        });
        dispatch(fetchSchedules(schedules));
      });
    return () => {
      unsubscribe();
    };
  }, []);

  // company
  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(uid)
      .collection("companies")
      .onSnapshot((sanpshots) => {
        sanpshots.docChanges().forEach((change) => {
          const company = change.doc.data() as Company;
          const changeType = change.type;
          switch (changeType) {
            case "added":
              companies.push(company);
              break;
            case "modified":
              const index = companies.findIndex(
                (company) => company.companyId === change.doc.id
              );
              companies[index] = company;
              break;
            case "removed":
              companies = companies.filter(
                (company) => company.companyId !== change.doc.id
              );
              break;
            default:
              break;
          }
        });
        dispatch(fetchCompanies(companies));
      });
    return () => {
      unsubscribe();
    };
  }, []);

  // bestWork
  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(uid)
      .collection("bestWorks")
      .onSnapshot((sanpshots) => {
        sanpshots.docChanges().forEach((change) => {
          const bestWork = change.doc.data() as BestWork;
          const changeType = change.type;
          switch (changeType) {
            case "added":
              bestWorks.push(bestWork);
              break;
            case "modified":
              const index = bestWorks?.findIndex(
                (bestWork) => bestWork.bestWorkId === change.doc.id
              );
              bestWorks[index] = bestWork;
              break;
            case "removed":
              console.log(change.doc.id);

              bestWorks = bestWorks.filter(
                (bestWork) => bestWork.bestWorkId !== change.doc.id
              );
              break;
            default:
              break;
          }
        });
        dispatch(fetchBestWorks(bestWorks));
      });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className={classes.headerMenus}>
      <div>{onCalendarPage && <Navigation />}</div>
      <div className={classes.iconButton}>
        <IconButton onClick={() => dispatch(push("/todo"))}>
          <Badge badgeContent={notCompletedToDoList.length} color="secondary">
            <CheckBoxIcon className={classes.icon} />
          </Badge>
        </IconButton>
        <IconButton onClick={(e) => props.handleDrawerToggle(e)}>
          <MenuIcoon className={classes.icon} />
        </IconButton>
      </div>
    </div>
  );
};

export default HeaderMenus;
