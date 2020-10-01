import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory();

const loadingActions = {
  showLoadingAction: actionCreator<string>("SHOW_LOADING_ACTION"),
  hideLoadingAction: actionCreator("HIDE_LOADING_ACTION")
}

export default loadingActions