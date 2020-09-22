import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Form, Row, Card } from "react-bootstrap";
import axios from "axios";
import  "../UserModule/Login/login.css";
import { useToasts } from 'react-toast-notifications';

const EditFlight = () => {
  const {addToast} = useToasts();
  const token = localStorage.jwtToken;
  const history = useHistory(); 
  const { id } = useParams();
  const [, setCancel] = useState();
  const location = useLocation();
  const [state, setState] = useState()
  const defaultValues = {
    passengerName: location.state.fl.passengerName,
    flightDestination: location.state.fl.flightDestination,
    flightType: location.state.fl.flightType,
    flightAmount: location.state.fl.flightAmount,
  }
  const { control, handleSubmit, register } = useForm({defaultValues});

  const onCancel = (e) => {
    e.preventDefault()
    setCancel(history.push("/flight"));
  };

  useEffect(() => {
    axios({
          url: `/flight/edit/${id}`, 
          method: "GET", 
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
        setState(   
          {
            passengerName: res.data.passengerName,
            flightDestination: res.data.flightDestination,
            flightType: res.data.flightType,
            flightAmount: res.data.flightAmount, 
          }
        );
      });
    }, []);

  const onSubmit = (data) => {           
   axios({
      url: `/flight/update/${id}`, 
      method: "PUT",   
      headers: { Authorization: `Bearer ${token}` }, 
      data
    })
    .then((res)=>{ 
      addToast(res.data.message, { autoDismiss: true, autoDismissTimeout: '6000' })
    })
    .catch((err) => {   
      addToast(err.data.message, { autoDismiss: true, autoDismissTimeout: '6000' })
      })
    history.push("/flight"); 
  };

  return (
    <div>
        <form 
          className="login-card" 
          name="register"
          scrollToFirstError
          noValidate 
          onSubmit={handleSubmit(onSubmit)}
        >
          <Card
            className="card"
            orientation="center" 
            style={{ width: "30vw", display: "center"}}
          >
          <div>
            <Row className="row-register"><h4>Edit Flight Details</h4></Row>
            <Row className="row-register">
              <Controller
                name="passengerName"
                control={control}
                register={register}
                as={
                  <Form.Group controlId="passengerName">
                    <Form.Control
                      placeholder="Enter flght name"
                      name="passengerName"
                      defaultValue={defaultValues.passengerName}
                      style={{width: "16rem"}
                      }
                    />
                  </Form.Group>
                }/>
            </Row>
            <Row className="row-register">
            <Controller
                name="flightDestination"
                control={control}
                register={register}
                as={
                  <Form.Group controlId="flightDestination">
                    <Form.Control 
                      as="select" custom
                      name="flightDestination"
                      style={{width: "16rem"}}
                    >
                      <option value={defaultValues.flightDestination}>{defaultValues.flightDestination}</option>
                      <option value="admin">Abu Dhabi</option>
                      <option value="Dubai">Dubai</option>
                      <option value="France">France</option>
                      <option value="London">London</option>
                      <option value="United States">United States</option>
                    </Form.Control>
                  </Form.Group>
              }/> 
            </Row>
            <Row className="row-register">
              <Controller
                name="flightType"
                control={control}
                register={register}
                as={
                  <Form.Group controlId="flightType">
                    <Form.Control 
                      as="select" custom
                      name="flightType"
                      style={{width: "16rem"}}
                  >
                      <option value={defaultValues.flightType}>{defaultValues.flightType}</option>
                      <option value="Economy Class">Economy Class</option>
                      <option value="First Class">First Class</option>
                      <option value="Business Class">Business Class</option>
                      <option value="VIP Class">VIP Class</option>
                    </Form.Control>
                  </Form.Group>
              }/>
            </Row>
            <Row className="row-register">
              <Controller
                name="flightAmount"
                control={control}
                register={register}
                as={
                  <Form.Group controlId="flightAmount">
                    <Form.Control
                      placeholder="Enter flght Amount"
                      name="flightType"
                      defaultValue={defaultValues.flightAmount}
                      style={{width: "16rem"}
                      }
                    />
                  </Form.Group>
              }/>
              </Row>
              <Row className="row-register">
                <button className="addBtn" block type="submit" >
                  Update Flight Details
                </button>
                <button className="addBtn" onClick={onCancel}>
                  back
                </button>
              </Row>
            </div>
          </Card>
        </form>
    </div>
  );
}
export default EditFlight;
