import axiosWithAuth from "../../../Helpers/axiosWithAuth";
export const UPDATE_INFO = "UPDATE_INFO";

export const LOGIN_SUBMIT = "LOGIN_SUBMIT";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const REGISTER_SUBMIT = "REGISTER_SUBMIT";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

export const SIGN_OUT = "SIGN_OUT";

export const UPDATE_PLACE = "UPDATE_PLACE";

export const userName = name => dispatch => {
  dispatch({
    type: UPDATE_INFO,
    payload: name
  });
};

export const login = (e, creds, history) => dispatch => {
  e.preventDefault();

  dispatch({ type: LOGIN_SUBMIT, payload: { ...creds } });
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
    .catch(_ =>
      dispatch({
        type: LOGIN_FAIL
      })
    );
};

export const register = (e, creds, history) => dispatch => {
  e.preventDefault();

  dispatch({ type: REGISTER_SUBMIT, payload: { ...creds } });
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
        dispatch({ type: REGISTER_SUCCESS, payload: res.data });
        localStorage.setItem("token", res.data.token);
        history.push("/dashboard");
      }
    })
    .catch(_ => dispatch({ type: REGISTER_FAIL }));
};

export const checkToken = () => dispatch => {
  axiosWithAuth()
    .get("/auth/info")
    .then(res => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data })
    })
    .catch(err => {
      console.error(err.message);
    })
}

export const signout = (e, history) => dispatch => {
  e.preventDefault();
  localStorage.removeItem("token");
  dispatch({ type: SIGN_OUT });
};

export const updatePlace = place => dispatch => {
  dispatch({ type: UPDATE_PLACE, payload: place });
}