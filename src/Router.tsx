import React from "react";
import { Route, Switch } from "react-router";
import { Home, SignIn, SignUp, CorporateAnalysis, SelfAnalysis, Calendar, ToDoList} from "./templates";
import Auth from "./Auth";

const Router: React.FC = () => {
  return (
    <Switch>
      <Route exact path={"/signin"} component={SignIn} />
      <Route exact path={"/signup"} component={SignUp} />
      <Auth>
        <Route exact path={"/self-analysis"} component={SelfAnalysis} />
        <Route exact path={"/corporate-analysis"} component={CorporateAnalysis} />
        <Route exact path={"/calendar"} component={Calendar} />
        <Route exact path={"/todo"} component={ToDoList} />
        <Route exact path={"(/)?"} component={CorporateAnalysis} />
      </Auth>
    </Switch>
  );
};

export default Router;
