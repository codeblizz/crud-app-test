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

const DisplayUsers = () => {
  const { addToast } = useToasts()
  const token = localStorage.jwtToken;
  const history = useHistory();
  const { url, path } = useRouteMatch();
  const [state, setState] = useState({
    email: "",     
    emailConfirm: "",     
    password: "",  
    role: "", 
    allUsers: [],
    message: "", 
  });  

  const onCancel = (e) => {
    e.preventDefault()
    setState(history.push("/flight"));
  };

  const onDelete = (id, us) => {
    if(us.role !== state.role){
        axios({
        url:`/user/${id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}`} 
        })
        .then(() => { 
            setState(
            {
            allUsers: state.allUsers.filter((us) => us._id !== id),
            });
        })
        .then((res)=>{
            addToast("User deleted successfully", { autoDismiss: true, autoDismissTimeout: '6000' })
        })
    } else {
        addToast("You don't have access privilege to delete details", { autoDismiss: true, autoDismissTimeout: '6000' })
    }
  };

  useEffect(() => {    
    axios({ 
        url: "/user",
        method: "GET", 
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setState({ 
          allUsers: res.data
        }, (prevState) => {
          return prevState.allUsers 
        });
      })
      .catch((err) => { 
        alert("Check your server: cannot retrieve data from database");
      });
  }, [state]);

  const displayUsers = () => {
    return state.allUsers.map((us) => ( 
      <tbody>
        <tr
          key={us._id} 
          style={{ borderTop: "1px solid #EBEDEF" }}
        >
          <td style={{ textAlign: "left", borderTop: "none", margin: 3 }}>
            {us.email}
          </td>
          <td style={{ position: "absolute", left: "50%", borderTop: "none", margin: 3 }}>
            {us.role}
          </td>
          <td style={{ position: "absolute", left: "92%", margin: 0 }}>
            <Button
              variant="danger" 
              style={{ color: "#fffff", height:"35px" }}
              onClick={() => {
                if (
                  window.confirm("Are you sure you wish to delete this item?")
                )
                  onDelete(us._id, us);
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
            <>
              <Table responsive style={{ borderSpacing: "1px", marginTop: 0}}>
                <thead tableLayout="auto">
                  <tr style={{ backgroundColor: "#EBEDEF" }}>
                    <th style={{ textAlign: "left" }}>User Email</th>
                    <th style={{ position: "absolute", left: "50%" }}>User Role</th>
                    <th style={{ position: "absolute", left: "90%" }}>Actions</th>
                  </tr>
                </thead>
                  {displayUsers(state.allUsers)} 
              </Table> 
              <button className="addBtn" type="submit" onClick={onCancel}>
                  back
              </button>
            </>
          )}
        />
      </Switch>
    </Router>
  );
};
export default DisplayUsers;
