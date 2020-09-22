import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Form, InputGroup, Row, Card } from "react-bootstrap";
import axios from "axios";
import classnames from "classnames";
import  "../UserModule/Login/login.css";
import { useToasts } from 'react-toast-notifications';

const AddFlight = () => {
  const { addToast } = useToasts()
  const token = localStorage.jwtToken;
  const { control, handleSubmit, register } = useForm();
  const history = useHistory(); 
  const [state, setState] = useState({
    passengerName: "",
    flightDestination: "",
    flightType: "",
    flightAmount: "",
    errors: {}
  });

  const onCancel = (e) => {
    e.preventDefault()
    setState(history.push("/flight"));
  };

  const onSubmit = (data) => {           
    axios({
        url: "/flight/create",
        method: "POST",   
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
            <Row className="row-register"><h4>Add Flight Details</h4></Row>
            <Row className="row-register">
              <Controller
                name="passengerName"
                control={control}
                ref={register}
                defaultValue=""
                as={
                  <Form.Group controlId="passengerName">
                    <Form.Control
                      placeholder="Enter passenger name"
                      name="passengerName"
                      errors={state.errors.passengerName}
                      style={{width: "16rem"}}
                    />
                    <span className="red-text">{state.errors.passengerName}</span>
                  </Form.Group>
                }/>
            </Row>
            <Row className="row-register">
              <Controller
                name="flightDestination"
                control={control}
                ref={register}
                defaultValue=""
                as={
                  <Form.Group controlId="flightDestination">
                    <Form.Control 
                      as="select" custom
                      name="flightDestination"
                      errors={state.errors.flightDestination}
                      style={{width: "16rem"}}
                      className={classnames("", {
                        invalid: state.errors.flightDestination
                      })
                    }>
                      <option>Select Flight Destination</option>
                      <option value="Abu Dhabi">Abu Dhabi</option>
                      <option value="Dubai">Dubai</option>
                      <option value="France">France</option>
                      <option value="London">London</option>
                      <option value="United States">United States</option>
                    </Form.Control>
                    <span className="red-text">{state.errors.flightDestination}</span>
                  </Form.Group>
              }/> 
            </Row> 
            <Row className="row-register">
              <Controller
                name="flightType"
                control={control}
                ref={register}
                defaultValue=""
                as={
                  <Form.Group controlId="flightType">
                    <Form.Control 
                      as="select" custom
                      name="flightType"
                      errors={state.errors.flightType}
                      style={{width: "16rem"}}
                      className={classnames("", {
                        invalid: state.errors.flightType
                      })
                  }>
                      <option>Select Flight Type</option>
                      <option value="Economy Class">Economy Class</option>
                      <option value="First Class">First Class</option>
                      <option value="Business Class">Business Class</option>
                      <option value="VIP Class">VIP Class</option>
                    </Form.Control>
                    <span className="red-text">{state.errors.flightType}</span>
                  </Form.Group>
              }/>
            </Row>
            <Row className="row-register">
              <Controller
                name="flightAmount"
                control={control}
                ref={register}
                defaultValue=""
                as={
                  <InputGroup style={{width: "60%"}} controlId="flightAmount">
                    <InputGroup.Prepend>
                      <InputGroup.Text>AED</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      placeholder="Enter flght Amount"
                      name="flightAmount"
                      errors={state.errors.flightAmount}
                    />
                    <span className="red-text">{state.errors.flightAmount}</span>
                  </InputGroup>
                }/>
              </Row>
              <Row className="row-register">
                <button className="addBtn" block type="submit" >
                  Add Flight Details 
                </button>
                <button className="addBtn" type="submit" onClick={onCancel}>
                  back
                </button>  
              </Row>
            </div>
          </Card>
        </form>
    </div>
  );
}
export default AddFlight;
