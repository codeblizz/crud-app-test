import {SUBMIT_LOGIN} from "../ActionTypes/types";
import axios from "axios";
 
export const submitLoginForm = () => dispatch => {
    axios.post('/user/login')
    .then(res => { 
      res.json() })
    .then(loginData => dispatch ({
      type: SUBMIT_LOGIN,
      payload: loginData
    }));
}