import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import { useToasts } from 'react-toast-notifications';
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import "../../App.css";

const DisplayFlight = () => {
  const { addToast } = useToasts()
  const token = localStorage.jwtToken;
  const history = useHistory();
  const { url, path } = useRouteMatch();
  const [state, setState] = useState({
    passengerName: "", 
    flightDestination: "", 
    flightType: "",
    flightAmount: "",
    flights: [],
    message: "", 
  });  

  const onDelete = (id) => {
    axios({
      url:`/flight/${id}`,
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}`} 
    })
      .then(() => { 
        setState(
          {
           flights: state.flights.filter((fl) => fl._id !== id),
          });
      })
      .then((res)=>{
        addToast("Flight deleted successfully", { autoDismiss: true, autoDismissTimeout: '6000' })
      })
  };

  useEffect(() => {    
    axios({ 
        url: "/flight/all",
        method: "GET", 
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setState({ 
          flights: res.data
        }, (prevState) => {
          return prevState.flights 
        });
      })
      .catch((err) => { 
        alert("Check your server: cannot retrieve data from database");
      });
  }, [state]);

  const handleEditTable = (id, fl) => {
    history.push({
      pathname: "/flight/edit/" + id,
      state: { fl }  
    });
  };

  const displayFlight = () => {
    return state.flights.map((fl) => ( 
      <tbody>
        <tr
          key={fl._id} 
          style={{ borderTop: "1px solid #EBEDEF" }}
        >
          <td style={{ textAlign: "left", borderTop: "none", margin: 3 }}>
            {fl.passengerName}
          </td>
          <td style={{ position: "absolute", left: "25%", borderTop: "none", margin: 3 }}>
            {fl.flightDestination}
          </td>
          <td style={{ position: "absolute", left: "50%", borderTop: "none", margin: 3 }}>
            {fl.flightType}
          </td>
          <td style={{ position: "absolute", left: "75%", borderTop: "none", margin: 3 }}>
            {fl.flightAmount} 
          </td> 
          <td style={{ position: "absolute", left: "87%", margin: 0 }}>
            <Button 
              variant="info"
              style={{ color: "#fffff", height:"35px" }}
              onClick={() => handleEditTable(fl._id, fl)}
            > 
              Edit 
            </Button>  
          </td>
          <td style={{ position: "absolute", left: "92%", margin: 0 }}>
            <Button
              variant="danger" 
              style={{ color: "#fffff", height:"35px" }}
              onClick={() => {
                if (
                  window.confirm("Are you sure you wish to delete this item?")
                )
                  onDelete(fl._id);
              }}
            >
              Delete
            </Button>
          </td>
        </tr>
      </tbody>
    ));
  };

  return (
    <Router>
      <Switch>
        <Route
          exact
          path={path}
          render={() => (
              <Table responsive style={{ borderSpacing: "1px", marginTop: 0}}>
                <thead tableLayout="auto">
                  <tr style={{ backgroundColor: "#EBEDEF" }}>
                    <th style={{ textAlign: "left" }}>Passenger Name</th>
                    <th style={{ position: "absolute", left: "25%" }}>Flight Destination</th>
                    <th style={{ position: "absolute", left: "50%" }}>Flight Type</th>
                    <th style={{ position: "absolute", left: "75%" }}>Flight Amount</th>
                    <th style={{ position: "absolute", left: "90%" }}>Actions</th>
                  </tr>
                </thead>
                  {displayFlight(state.flights)}
              </Table> 
          )}
        />
      </Switch>
    </Router>
  );
};
export default DisplayFlight;
