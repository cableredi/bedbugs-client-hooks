import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import BedbugsContext from "../../BedbugsContext";
import TokenService from "../../services/token-service";
import AuthApiService from "../../services/auth-api-service";
import IdleService from "../../services/idle-service";
import ApplicationsApiService from "../../services/applications-api-service";
import BugsApiService from "../../services/bugs-api-service";

export default function Landing() {
  const { setApplications, setBugs, resetState } = useContext(BedbugsContext);

  const [error, updateError] = useState("");

  let history = useHistory();

  /***********************/
  /* handleSubmitJWTAuth */
  /***********************/
  const handleSubmitJwtAuth = (user_name, password) => {
    updateError("");

    AuthApiService.postLogin({
      user_name: user_name,
      password: password,
    })
      .then((res) => {
        handleLoginSuccess();
      })
      .catch((res) => {
        updateError(res.error);
      });
  };

  const logoutFromIdle = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    resetState({});
  };

  const handleLoginSuccess = () => {
    IdleService.setIdleCallback(() => logoutFromIdle());

    IdleService.registerIdleTimerResets();

    TokenService.queueCallbackBeforeExpiry(() => {
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
      .catch((error) => updateError(error.message));
  };

  return (
    <section className="section-page">
      <header role="banner">
        <h1>bedbugs</h1>
        <h2>Keep track of those annoying bugs in your applications!</h2>
      </header>

      <section>
        <h3>What can bedbugs do for you?</h3>
        <div>
          <p>
            Have you ever been new to a project and dont know where to start?
          </p>
          <p>
            Maybe you are a seasoned veteran, go on vacation and come back to
            find you've forgotten what bugs you were working on?
          </p>
          <p>
            Or maybe you just like writing down and being able to keep track of
            your bugs
          </p>
        </div>
        <h4>If so, bedbugs is for you!!!</h4>

        <div className="Landing__demo">
          {error && <p className="error">{error}</p>}
          <h1>Try it out!</h1>
          <div className="form__button-group">
            <button
              className="button"
              onClick={() => {
                handleSubmitJwtAuth("demouser", "demoUser1!");
              }}
            >
              Login
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}
