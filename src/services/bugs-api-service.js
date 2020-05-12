import config from '../config';
import TokenService from './token-service';

const BugsApiService = {
  getAll() {
    return fetch(config.API_ENDPOINT_BUGS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  postBug(bug) {
    return fetch(config.API_ENDPOINT_BUGS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(bug),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  patchBug(bug) {
    return fetch(config.API_ENDPOINT_BUGS + `/${bug.bug_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(bug),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res
    );
  },
  deleteBug(bug_id) {
    return fetch(config.API_ENDPOINT_BUGS + `/${bug_id}`, {
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

export default BugsApiService;