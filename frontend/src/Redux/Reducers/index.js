import { combineReducers } from "redux";
import authReducers from "./authReducers";
import loginReducers from "./loginReducers";
import flightReducers from "./flightReducers";
import alertReducers from "./alertReducers";

const rootReducer = combineReducers({
  alert: alertReducers,
  auth: authReducers,
  login: loginReducers, 
  flight: flightReducers,
});
export default rootReducer;