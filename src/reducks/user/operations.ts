import { auth, FirebaseTimestamp, db } from "../../firebase/index";
import { push } from "connected-react-router";
import { Dispatch } from "redux";
import usersActions from "./actions";
import { RootState } from "../../entity/rootState";
import { Company } from "../../entity/company";
import { BestWork, Schedule, ToDo, Experience } from "../../entity/user";
import dayjs from "dayjs";

export const fetchExperiences = (experiences: Experience[]) => {
  return async (dispatch: Dispatch) => {
    await dispatch(usersActions.fetchExperiencesAction(experiences));
  };
};
export const fetchToDoList = (toDoList: ToDo[]) => {
  return async (dispatch: Dispatch) => {
    await dispatch(usersActions.fetchToDoListAction(toDoList));
  };
};

export const fetchSchedules = (schedules: Schedule[]) => {
  return async (dispatch: Dispatch) => {
    await dispatch(usersActions.fetchSchedulesAction(schedules));
  };
};

export const fetchCompanies = (companies: Company[]) => {
  return async (dispatch: Dispatch) => {
    await dispatch(usersActions.fetchCompaniesAction(companies));
  };
};

export const fetchBestWorks = (bestWorks: BestWork[]) => {
  return async (dispatch: Dispatch) => {
    await dispatch(usersActions.fetchBestWorksAction(bestWorks));
  };
};

export const addExperiences = (experience: Experience) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const uid = getState().user.uid;
    const timestamp = FirebaseTimestamp.now();

    if (experience.title === "") {
      alert("必須項目が未入力です");
    } else {
      if (experience.experienceId === "") {
        const toDoRef = db
          .collection("users")
          .doc(uid)
          .collection("experiences")
          .doc();
        experience["experienceId"] = toDoRef.id;
        experience["created_at"] = timestamp;
        experience["updated_at"] = timestamp;
        await toDoRef.set(experience);
      } else {
        const ToDoRef = db
          .collection("users")
          .doc(uid)
          .collection("experiences")
          .doc(experience.experienceId);
        experience["updated_at"] = timestamp;
        await ToDoRef.set(experience, { merge: true });
      }
    }
  };
};

export const addToDo = (toDo: ToDo) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const uid = getState().user.uid;
    const timestamp = FirebaseTimestamp.now();

    if (toDo.title === "") {
      alert("必須項目が未入力です");
    } else {
      if (toDo.toDoId === "") {
        const toDoRef = db
          .collection("users")
          .doc(uid)
          .collection("toDoList")
          .doc();
        toDo["toDoId"] = toDoRef.id;
        toDo["created_at"] = timestamp;
        toDo["updated_at"] = timestamp;
        await toDoRef.set(toDo);
      } else {
        const ToDoRef = db
          .collection("users")
          .doc(uid)
          .collection("toDoList")
          .doc(toDo.toDoId);
        toDo["updated_at"] = timestamp;
        await ToDoRef.set(toDo, { merge: true });
      }
    }
  };
};

export const addSchedule = (schedule: Schedule) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const uid = getState().user.uid;
    const timestamp = FirebaseTimestamp.now();

    if (schedule.title === "") {
      alert("必須項目が未入力です");
    } else {
      if (schedule.scheduleId === "") {
        const scheduleRef = db
          .collection("users")
          .doc(uid)
          .collection("schedules")
          .doc();
        schedule["scheduleId"] = scheduleRef.id;
        schedule["created_at"] = timestamp;
        schedule["updated_at"] = timestamp;
        await scheduleRef.set(schedule);
      } else {
        const scheduleRef = db
          .collection("users")
          .doc(uid)
          .collection("schedules")
          .doc(schedule.scheduleId);
        schedule["updated_at"] = timestamp;
        await scheduleRef.set(schedule, { merge: true });
      }
    }
  };
};

export const addCompany = (
  company: Company,
  deletedScheduleIdList: string[]
) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const uid = getState().user.uid;
    const timestamp = FirebaseTimestamp.now();

    if (deletedScheduleIdList.length > 0) {
      deletedScheduleIdList.map((deleteScheduleId) => {
        if (deleteScheduleId !== "") {
          db.collection("users")
            .doc(uid) 
            .collection("schedules")
            .doc(deleteScheduleId)
            .delete();
        }
      });
    }

    if (company.companyId === "") {
      const companyRef = db
        .collection("users")
        .doc(uid)
        .collection("companies")
        .doc();
      company["companyId"] = companyRef.id;
      company["created_at"] = timestamp;
      company["updated_at"] = timestamp;

      if (company.schedules.length > 0) {
        company.schedules.map((schedule, i) => {
          if (schedule.title === "") {
            alert("必須項目が未入力です");
          } else {
            if (schedule.scheduleId === "") {
              // var l = 8;

              // 生成する文字列に含める文字セット
              const c = "abcdefghijklmnopqrstuvwxyz0123456789";
              const cl = c.length;
              let r = "";
              for (let i = 0; i < 20; i++) {
                r += c[Math.floor(Math.random() * cl)];
              }
              schedule.scheduleId = companyRef.id + r;
              const scheduleRef = db
                .collection("users")
                .doc(uid)
                .collection("schedules")
                .doc(schedule.scheduleId);
              // schedule["scheduleId"] = scheduleRef.id;
              schedule["created_at"] = timestamp;
              schedule["updated_at"] = timestamp;
              scheduleRef.set(schedule);
            } else {
              const scheduleRef = db
                .collection("users")
                .doc(uid)
                .collection("schedules")
                .doc(schedule.scheduleId);
              schedule["updated_at"] = timestamp;
              scheduleRef.set(schedule, { merge: true });
            }
          }
        });
      }

      await companyRef.set(company);
    } else {
      const companyRef = db
        .collection("users")
        .doc(uid)
        .collection("companies")
        .doc(company.companyId);
      company["updated_at"] = timestamp;

      if (company.schedules.length > 0) {
        company.schedules.map((schedule, i) => {
          if (schedule.title === "") {
            alert("必須項目が未入力です");
          } else {
            if (schedule.scheduleId === "") {
              const c = "abcdefghijklmnopqrstuvwxyz0123456789";
              const cl = c.length;
              let r = "";
              for (let i = 0; i < 20; i++) {
                r += c[Math.floor(Math.random() * cl)];
              }
              schedule.scheduleId = companyRef.id + r;
              const scheduleRef = db
                .collection("users")
                .doc(uid)
                .collection("schedules")
                .doc(schedule.scheduleId);
              // schedule["scheduleId"] = scheduleRef.id;
              schedule["created_at"] = timestamp;
              schedule["updated_at"] = timestamp;
              scheduleRef.set(schedule);
            } else {
              const scheduleRef = db
                .collection("users")
                .doc(uid)
                .collection("schedules")
                .doc(schedule.scheduleId);
              schedule["updated_at"] = timestamp;
              scheduleRef.set(schedule, { merge: true });
            }
          }
        });
      }
      await companyRef.set(company, { merge: true });
    }
  };
};

type StrengthsAndWeaknesses = {
  strengths: string;
  weaknesses: string;
  updated_at?: firebase.firestore.Timestamp;
};

export const setStrengthsAndWeaknesses = (
  strengthsAndWeaknesses: StrengthsAndWeaknesses
) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(usersActions.setStrengthsAndWeaknesses(strengthsAndWeaknesses));
  };
};

export const addStrengthsAndWeaknesses = (
  strengthsAndWeaknesses: StrengthsAndWeaknesses
) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const uid = getState().user.uid;
    const timestamp = FirebaseTimestamp.now();

    strengthsAndWeaknesses["updated_at"] = timestamp;
    await db
      .collection("users")
      .doc(uid)
      .set(strengthsAndWeaknesses, { merge: true });
  };
};

export const addBestWork = (bestWork: BestWork) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const uid = getState().user.uid;
    const timestamp = FirebaseTimestamp.now();

    if (bestWork.bestWorkId === "") {
      const bestWorkRef = db
        .collection("users")
        .doc(uid)
        .collection("bestWorks")
        .doc();
      bestWork["bestWorkId"] = bestWorkRef.id;
      bestWork["created_at"] = timestamp;
      bestWork["updated_at"] = timestamp;
      await bestWorkRef.set(bestWork);
    } else {
      const bestWorkRef = db
        .collection("users")
        .doc(uid)
        .collection("bestWorks")
        .doc(bestWork.bestWorkId);
      bestWork["updated_at"] = timestamp;
      await bestWorkRef.set(bestWork, { merge: true });
    }
  };
};

export const listenAuthState = () => {
  return async (dispatch: Dispatch) => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        db.collection("users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();
            if (!data) {
              throw new Error("ユーザーデータが存在しません。");
            }
            dispatch(
              usersActions.signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
                strengths: data.strengths,
                weaknesses: data.weaknesses,
              })
            );
          });
      } else {
        dispatch(push("/signin"));
      }
    });
  };
};

type signUp = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const signUp = ({
  username,
  email,
  password,
  confirmPassword,
}: signUp) => {
  return async (dispatch: Dispatch) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;
        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimestamp.now();
          const userInitialData = {
            created_at: timestamp,
            email: email,
            role: "customer",
            uid: uid,
            updated_at: timestamp,
            username: username,
            strengths: "",
            weaknesses: "",
          };
          db.collection("users")
            .doc(uid)
            .set(userInitialData)
            .then(() => {
              dispatch(push("/"));
            });
        }
      })
      .catch((error) => {
        alert("アカウント登録に失敗しました。もう1度お試しください。");
        throw new Error(error);
      });
  };
};

type SignIn = {
  email: string;
  password: string;
};

export const signIn = ({ email, password }: SignIn) => {
  return async (dispatch: Dispatch) => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;
        if (!user) {
          throw new Error("ユーザーIDを取得できません");
        }
        const uid = user.uid;
        return db
          .collection("users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();
            if (!data) {
              throw new Error("ユーザーデータが存在しません");
            }
            dispatch(
              usersActions.signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
                strengths: data.strengths,
                weaknesses: data.weaknesses,
              })
            );
            dispatch(push("/"));
          });
      })
      .catch(() => {
        alert("サインインに失敗しました");
      });
  };
};

export const signOut = () => {
  return async (dispatch: Dispatch) => {
    auth
      .signOut()
      .then(() => {
        dispatch(
          usersActions.signOutAction({
            isSignedIn: false,
            role: "",
            uid: "",
            username: "",
            strengths: "",
            weaknesses: "",
            experiences: [],
            toDoList: [],
            schedules: [],
            companies: [],
            bestWorks: [],
          })
        );
        dispatch(push("/signin"));
      })
      .catch(() => {
        throw new Error("ログアウトに失敗しました。");
      });
  };
};
