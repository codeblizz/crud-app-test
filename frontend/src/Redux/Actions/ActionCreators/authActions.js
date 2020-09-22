import axios from "axios";
import setAuthToken from "../../Utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_USER_ERRORS,
  SET_CURRENT_USER,
} from "../ActionTypes/types";

export const registerUser = (newUser, history) => dispatch => {
  axios
    .post("/user/register", newUser)
    .then(res => history.push("/")) 
    .catch(err =>
      dispatch({
        type: GET_USER_ERRORS,
        payload: err.response.data
      })
    );
}; 

export const loginUser = userData => dispatch => {
  axios
    .post("/user/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_USER_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};