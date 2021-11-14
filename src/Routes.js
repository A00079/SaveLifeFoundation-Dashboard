import React, { lazy, Suspense } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { WithLayoutRoute } from "./routers";
import { PublicLayout, SecondaryPublicLayout } from "./layouts";

// const LandingPage = lazy(() => import("./pages/LandingPage"));

import Home from "./pages/Home";
import ComposeEmails from "./pages/ComposeEmails";
import { AddItems } from "./pages/ManageItems/components";
import { ManageCakes, EditDeleteCakes } from "./pages/ManageCakes/components";
import { ManageUtilities } from "./pages/ManageUtilities/components";

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
const Routes = () => {
  return (
    <Router>
      <Switch>
        <WithLayoutRoute
          exact
          path="/Home"
          layout={PublicLayout}
          component={Home}
        />
        <WithLayoutRoute
          exact
          path="/signin"
          layout={SecondaryPublicLayout}
          component={Login}
        />
        <WithLayoutRoute
          exact
          path="/partyfyd-cpanel"
          layout={SecondaryPublicLayout}
          component={Signup}
        />
        <WithLayoutRoute
          exact
          path="/compose-email"
          layout={PublicLayout}
          component={ComposeEmails}
        />
        <WithLayoutRoute
          exact
          path="/manage-items"
          layout={PublicLayout}
          component={AddItems}
        />
        <WithLayoutRoute
          exact
          path="/add-product"
          layout={PublicLayout}
          component={ManageCakes}
        />
        <WithLayoutRoute
          exact
          path="/manage-product"
          layout={PublicLayout}
          component={EditDeleteCakes}
        />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </Router>
  );
};

export default Routes;
