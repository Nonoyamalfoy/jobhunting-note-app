import { auth, FirebaseTimestamp, db } from "../../firebase/index";
import { push } from "connected-react-router";
import { Dispatch } from "redux";

import usersActions from "./actions";

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
  password: string
}

export const signIn = ({email, password}: SignIn) => {
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
        dispatch(usersActions.signOutAction({
          isSignedIn: false,
          role: "",
          uid: "",
          username: "",
        }));
        dispatch(push("/signin"));
      })
      .catch(() => {
        throw new Error("ログアウトに失敗しました。");
      });
  };
};
