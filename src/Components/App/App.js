import React, { useState, useContext, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import Toolbar from "../Nav/Toolbar/Toolbar";
import SideDrawer from "../Nav/SideDrawer/SideDrawer";
import Backdrop from "../Nav/Backdrop/Backdrop";
import Landing from "../Landing/Landing";
import ApplicationsListPage from "../../routes/ApplicationsListPage";
import AddApplicationPage from "../../routes/AddApplicationPage";
import UpdateApplicationPage from "../../routes/UpdateApplicationPage";
import BugsListPage from "../../routes/BugsListPage";
import AddBugPage from "../../routes/AddBugPage";
import UpdateBugPage from "../../routes/UpdateBugPage";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import LoginPage from "../../routes/LoginPage";
import RegistrationPage from "../../routes/RegistrationPage";
import ApplicationsApiService from "../../services/applications-api-service";
import BugsApiService from "../../services/bugs-api-service";
import TokenService from "../../services/token-service";
import IdleService from "../../services/idle-service";
import { PrivateRoute } from "../Helpers/PrivateRoute";
import PublicOnlyRoute from "../Helpers/PublicOnlyRoute";
import BedbugsContext from "../../BedbugsContext";
import { BedbugsProvider } from "../../BedbugsContext";

export default function App() {
  const { setApplications, setBugs, setError, error } = useContext(BedbugsContext);

  const [ sideDrawerOpen, setSideDrawerOpen ] = useState(false);

  /*******************************/
  /* Sidebar and backdrop toggles */
  /*******************************/
  const drawerToggleClickHandler = () => {
    let prevSideDrawerOpen = sideDrawerOpen;
    setSideDrawerOpen(!prevSideDrawerOpen);
  };

  const backdropClickHandler = () => {
    setSideDrawerOpen(false);
  };

  /**************************************************/
  /* get applications and bugs from db if logged in */
  /**************************************************/
  useEffect(() => {
    if (TokenService.hasAuthToken()) {
      const applicationsRequest = ApplicationsApiService.getAll();
      const bugsRequest = BugsApiService.getAll();

      Promise.all([applicationsRequest, bugsRequest])
        .then((values) => {
          setApplications(values[0]);
          setBugs(values[1]);
        })
        .catch((error) => setError(error));

      return () => {
        IdleService.unRegisterIdleResets();
        TokenService.clearCallbackBeforeExpiry();
      };
    }
  });

  let backdrop;

  if (sideDrawerOpen) {
    backdrop = <Backdrop click={backdropClickHandler} />;
  }

  return (
    <div className="App">
      {/* Navigation */}
      <Route
        path="/"
        render={() => (
          <>
            <Toolbar drawerClickHandler={drawerToggleClickHandler} />
            <SideDrawer show={sideDrawerOpen} />
            {backdrop}
          </>
        )}
      />
      <div className="sectionSpacer"></div>
      {error ? null : <div className='error'>{error}</div>}
      
      <BedbugsProvider>
        <Switch>
          {/* Landing Page */}
          <Route exact path="/" component={Landing} />
          <PublicOnlyRoute path={"/login"} component={LoginPage} />
          <PublicOnlyRoute
            path={"/registration"}
            component={RegistrationPage}
          />
          {/* Applications Summary */}
          <PrivateRoute
            exact
            path="/applications"
            component={ApplicationsListPage}
          />
          } />
          {/* Add an Application */}
          <PrivateRoute
            exact
            path="/addapplication"
            component={AddApplicationPage}
          />
          } />
          {/* Update an Application */}
          <PrivateRoute
            exact
            path="/updateapplication/:application_id"
            component={(routeProps) => (
              <UpdateApplicationPage {...routeProps} />
            )}
          />
          {/* Bugs Summary */}
          <PrivateRoute
            exact
            path="/bugs/:status/:application_id?"
            component={(routeProps) => <BugsListPage {...routeProps} />}
          />
          {/* Add a Bug */}
          <PrivateRoute
            exact
            path="/addbug"
            component={(routeProps) => <AddBugPage {...routeProps} />}
          />
          {/* Update a Bug */}
          <PrivateRoute
            exact
            path="/updatebug/:bug_id"
            component={(routeProps) => <UpdateBugPage {...routeProps} />}
          />
          {/* Not Found Page */}
          <Route component={NotFoundPage} />
        </Switch>
      </BedbugsProvider>
    </div>
  );
}
