import ax from "../axios";
import { updateCurrentUser } from "../redux/actions";
import { store } from "../redux/store";
import { getCookie } from "../shared";

export const logIn = (params) => {
  store.dispatch(updateCurrentUser());
  return new Promise((resolve, reject) => {
    ax.post(`/auth/login`, params)
      .then((res) => {
        console.log(res)
        localStorage.setItem("token", res.data.jwt);
        const { user } = res.data;
        resolve({ ...user.data.attributes, id: user.data.id });
      })
      .catch(reject);
  });
};

/**
 * Removes locally stored tokens and redirects to base href
 */
export const logOut = (redirectTarget = "/") => {
  emptyStorage()
  window.location.href = redirectTarget;
};

export const emptyStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("obj");
}

/**
 * Returns a promise which resolves when we get user details from the backend
 * Rejects when the user is logged out
 * @returns Promise
 */
export const checkForUserInSession = async () => {
  store.dispatch(updateCurrentUser());

  if(!getCookie("inSession")) {
    localStorage.removeItem("token");
    return Promise.reject()
  }

  return new Promise((resolve, reject) => {
    currentUserSession()
      .then((res) => {
        store.dispatch(updateCurrentUser(res.data.data));
        resolve(res);
      })
      .catch(reject);
  });
};

export const currentUserSession = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const response = await ax.get("/auth/auto_login");
    return response;
  } else return Promise.reject();
};