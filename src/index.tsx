import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { MuiThemeProvider } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DayjsUtils from "@date-io/dayjs";
import { theme } from "./assets/theme";

import store, { history } from "./reducks/store/store";
import dayjs from "dayjs";
import "dayjs/locale/ja";

dayjs.locale("ja");

// import createStore from "./reducks/store/store";
// import * as History from "history";

// const history = History.createBrowserHistory();
// export const store = createStore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history} >
      <MuiPickersUtilsProvider utils={DayjsUtils} locale={dayjs.locale("ja")}>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
