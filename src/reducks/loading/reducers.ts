import { reducerWithInitialState } from "typescript-fsa-reducers";
import {Loading} from "../../type/loading"
import loadingActions from "./actions";

const init: Loading = {
  state: false,
  text: "",
};

const LoadingReducer = reducerWithInitialState(init)
  .case(loadingActions.showLoadingAction, (state, payload) => ({
    state: true,
    text: payload,
  }))
  .case(loadingActions.hideLoadingAction, () => ({
    state: false,
    text: ""
  }));

export default LoadingReducer;
