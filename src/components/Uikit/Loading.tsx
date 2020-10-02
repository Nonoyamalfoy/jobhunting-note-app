import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector } from "react-redux";
import {
  getLoadingState,
  getLoadingText,
} from "../../reducks/loading/selectors";
import { RootState } from "../../type/rootState";

const Loading: React.FC = (props) => {
  const selector = useSelector((state: RootState) => state);
  const isBeingLoaded = getLoadingState(selector);
  const loadingText = getLoadingText(selector);

  return (
    <>
      {isBeingLoaded && (
        <section className="loading">
          <CircularProgress />
          <p>{loadingText}</p>
        </section>
      )}
      {props.children}
    </>
  );
};
export default Loading;
