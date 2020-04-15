import axiosWithAuth from "../../../Helpers/axiosWithAuth";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const SIGN_OUT = "SIGN_OUT";

export const UPDATE_PLACE = "UPDATE_PLACE";
export const UPDATE_SAVED_LOCATIONS = "UPDATE_SAVED_LOCATIONS";

export const login = (e, creds, history) => dispatch => {
  e.preventDefault();
  axiosWithAuth()
    .post("/auth/login", {
      email: creds.email,
      password: creds.password
    })
    .then(res => {
      if (res.data.id) {
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        localStorage.setItem("token", res.data.token);
        history.push("/dashboard");
      }
    })
    .catch(err => console.error(err.message));
};

export const register = (e, creds, history) => dispatch => {
  e.preventDefault();
  axiosWithAuth()
    .post("/auth/user/register", {
      username: creds.username,
      firstName: creds.firstname,
      lastName: creds.lastname,
      email: creds.email,
      password: creds.password
    })
    .then(res => {
      if (res.data.id) {
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        localStorage.setItem("token", res.data.token);
        history.push("/dashboard");
      }
    })
    .catch(err => console.error(err.message));
};

export const checkToken = () => dispatch => {
  axiosWithAuth()
    .get("/auth/info")
    .then(res => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.error(err.message);
    });
};

export const signout = (e, history) => dispatch => {
  e.preventDefault();
  localStorage.removeItem("token");
  dispatch({ type: SIGN_OUT });
};

export const updatePlace = place => dispatch => {
  dispatch({ type: UPDATE_PLACE, payload: place });
};

export const getSavedLocations = () => dispatch => {
  axiosWithAuth()
    .get("/locations/saved/")
    .then(res => {
      dispatch({ type: UPDATE_SAVED_LOCATIONS, payload: res.data });
    })
    .catch(err => console.error(err.message));
};
