import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import BedbugsContext from "../BedbugsContext";
import LoginForm from "../Components/LoginForm/LoginForm";
import TokenService from "../services/token-service";
import AuthApiService from "../services/auth-api-service";
import IdleService from "../services/idle-service";
import BugsApiService from "../services/bugs-api-service";
import ApplicationsApiService from "../services/applications-api-service";

export default function LoginPage() {
  const { setApplications, setBugs } = useContext(BedbugsContext);

  const [error, setError] = useState("");

  const history = useHistory();

  const logoutFromIdle = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.resetState({});
    this.forceUpdate();
  };

  const handleLoginSuccess = () => {
    IdleService.setIdleCallback(() => logoutFromIdle());
    IdleService.registerIdleTimerResets();
    TokenService.queueCallbackBeforeExpiry(() => {
      /* the timoue will call this callback just before the token expires */
      AuthApiService.postRefreshToken();
    });

    //Get all applications and bugs from DB and update state
    const applicationsRequest = ApplicationsApiService.getAll();
    const bugsRequest = BugsApiService.getAll();

    Promise.all([applicationsRequest, bugsRequest])
      .then((values) => {
        setApplications(values[0]);
        setBugs(values[1]);

        history.push("/applications");
      })
      .catch((error) => setError(error.message));
  };

  return (
    <section className="section-page">
      <h2>Login</h2>

      {error && <p className="error">{error}</p>}

      <LoginForm onLoginSuccess={() => handleLoginSuccess()} />
    </section>
  );
}
