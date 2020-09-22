import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import LoginAdmin from "./Components/UserModule/Login/LoginAdmin";
import Register from "./Components/UserModule/Register/Register";
import PageNotFound from "./Components/UserModule/Login/PageNotFound"
import jwt_decode from "jwt-decode";
import setAuthToken from "./Redux/Utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./Redux/Actions/ActionCreators/authActions";
import PrivateRoute from "./Components/FlightModule/PrivateRoute";
import store from "./Redux/Store/store"; 
import HomePage from "./Components/FlightModule/HomePage";
import { ToastProvider } from 'react-toast-notifications';

if (localStorage.jwtToken) { 
  const token = localStorage.jwtToken;  
  setAuthToken(token);    
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000; 
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());     
    window.location.href = "/";
  }
}

const PosToast = ({ appearance, children }) => (
  <div style={{ 
    background: appearance === 'error' ? 'red' : '#B6EFD4', 
    color: '#0A210F', margin: 5, borderColor: 'red', borderWidth: 40,
    padding: 10, fontSize: 16, fontWeight: 15, borderRadius: "3px"  
  }}>             
    {children}   
  </div>
);

const App = () => {    
  return (  
    <ToastProvider 
      placement="bottom-right" 
      transitionDuration="1020" 
      components={{ Toast: PosToast }} 
    >  
      <Router>         
          <div className="App" style={{ overflow: "auto", height: "100vh" }}>
            <Route exact path="/" render={()=><LoginAdmin />}/>
            <Route exact path="/signup" render={()=><Register />}/>
            <Route exact path="#" render={()=>(<PageNotFound />)} />
            <Switch>    
              <PrivateRoute exact path="/flight" component={HomePage} />
            </Switch>         
          </div>  
      </Router>
    </ToastProvider>     
  );
};
export default App;
