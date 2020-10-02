import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getIsSignedIn } from "./reducks/user/selectors";
import { listenAuthState } from "./reducks/user/operations";
import { RootState } from "./type/rootState";

type Props = {
  children: React.ReactNode;
};

type Auth = (children: Props) => any

const Auth: Auth = ({children}) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const isSignedIn = getIsSignedIn(selector);

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState());
    }
  }, []);

  if (!isSignedIn) {
    return <></>;
  } else {
    return children;
  }
};

export default Auth;
