import React from "react";
import { Route, Switch } from "react-router";
import { Home, SignIn, SignUp, CompanyList } from "./templates";
import Auth from "./Auth";

const Router: React.FC = () => {
  return (
    <Switch>
      <Route exact path={"/signin"} component={SignIn} />
      <Route exact path={"/signup"} component={SignUp} />
      <Auth>
        <Route exact path={"/company-list"} component={CompanyList} />
        <Route exact path={"(/)?"} component={Home} />
      </Auth>
    </Switch>
  );
};

export default Router;
