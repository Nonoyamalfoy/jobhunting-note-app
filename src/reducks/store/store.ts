import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { RootState } from "../../entity/rootState";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

import UserReducer from "../user/reducer";
import CalendarReducer from "../calendar/reducer";
import LoadingReducer from "../loading/reducers";

export const history = createBrowserHistory();

const store = createStore(
  combineReducers<RootState>({
    router: connectRouter(history),
    user: UserReducer,
    calendar: CalendarReducer,
    loading: LoadingReducer,
  }),
  compose(
    applyMiddleware(routerMiddleware(history), thunk)
    // (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    //   (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
