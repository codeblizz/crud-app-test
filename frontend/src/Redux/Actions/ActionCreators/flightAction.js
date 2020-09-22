import {
  GET_FLIGHT_SUCCESS,
  GET_FLIGHT_ERRORS,
  RESET_FLIGHT,
  CREATE_FLIGHT,
  DELETE_FLIGHT,
  EDIT_FLIGHT,
  GET_ALLFLIGHT,
  UPDATE_FLIGHT,   
  } from "../ActionTypes/types";
import axios from "axios";

export const getErrors = (errors) => {
  return {
      type: GET_FLIGHT_ERRORS,
      payload: errors
  }
}
export const getSuccess = (success) => {
  return {
      type: GET_FLIGHT_SUCCESS,
      payload: success
  }
} 
export const actionGetAllFlight = () => dispatch => {
  axios.get("/flight")
  .then(res=>console.log(res.data))
  .then(allFlight => dispatch({
    type: GET_ALLFLIGHT, 
    payload: allFlight
  }));
}
export const actionCreateFlight = (flightData) => dispatch => {
  axios.post('/flight/create/', flightData)
  .then(res => { res.json() })
  .then(res => dispatch ({
    type: CREATE_FLIGHT,
    payload: res.data
  }));
}
export const actionDeleteFlight = (id) => dispatch => {
  axios.post('/flight/', id)
  .then(res => {
      dispatch ({
          type: DELETE_FLIGHT,
          payload: id
      })
      // onDeleteSuccess()
  })
  .catch((error) => console.log(error))
}
export const actionUpdateFlight = (id) => dispatch => {
  axios.post('/flight/update/', id)
  .then(res => { res.json() })
  .then(res => dispatch ({
    type: UPDATE_FLIGHT,
    payload: res.data
  }));
}
export const actionEditFlight = (id) => dispatch => {
  axios.post('/flight/edit/', id)
  .then(res => { res.json() })
  .then(res => dispatch ({
    type: EDIT_FLIGHT,
    payload: res.data
  }));
}
export const actionResetItem = (id) => dispatch => {
  axios.post('/flight/reset/', id)
  .then(res => { res.json() })
  .then(res => dispatch ({
    type: RESET_FLIGHT,
    payload: res.data
  }));
}