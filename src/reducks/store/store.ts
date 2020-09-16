import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";
import { RootState } from "../../domain/entity/rootState";
import { connectRouter, routerMiddleware } from "connected-react-router";
import {createBrowserHistory} from "history";

import UserReducer from "../user/reducer"

export const history = createBrowserHistory();

// export default function createStore(
//   history: History.BrowserHistory<History.State>
// ) {
//   return reduxCreateStore(
//     combineReducers<RootState>({
//       router: connectRouter(history),
//       user: UserReducer,
//     }),
//     compose(
//       applyMiddleware(routerMiddleware(history), thunk),
//       (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
//         (window as any).__REDUX_DEVTOOLS_EXTENSION__()
//     )
//   );
// }



const store = createStore(
  combineReducers<RootState>({
    router: connectRouter(history),
    user: UserReducer
  }),
  compose(
    applyMiddleware(
      routerMiddleware(history),
      thunk
      ),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
