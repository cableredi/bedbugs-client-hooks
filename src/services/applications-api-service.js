import config from "../config";
import TokenService from "./token-service";

const ApplicationsApiService = {
  getAll() {
    return fetch(config.API_ENDPOINT_APPLICATIONS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  postApplication(application) {
    return fetch(config.API_ENDPOINT_APPLICATIONS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(application),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  patchApplication(application) {
    return fetch(config.API_ENDPOINT_APPLICATIONS + `/${application.application_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(application),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res
    );
  },
  deleteApplication(application_id) {
    return fetch(config.API_ENDPOINT_APPLICATIONS + `/${application_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res
    );
  }
};

export default ApplicationsApiService;
