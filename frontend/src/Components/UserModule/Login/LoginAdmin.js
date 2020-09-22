import React from "react";
import LoginForm from "./form/LoginForm";
import { Row, Col, Card } from "react-bootstrap";
import "./login.css";
import { useToasts } from 'react-toast-notifications';

const LoginAdmin = () => {
  const {addToast} = useToasts();
  const loginToaster = () => {
    addToast('Login successfully', { autoDismiss: true, autoDismissTimeout: '5000' })
  }
  const logoutToaster = () => {
    addToast('Login failed', { autoDismiss: true, autoDismissTimeout: '5000' })
  }

  return (
    <div>
      <div className="login-card"> 
        <Row>
          <Col>
              <Card
                className="card"
                orientation="center" 
                style={{ width: "30vw" }}
              >
              <Row>
                <Col>
                  <LoginForm loginToaster={loginToaster} logoutToaster={logoutToaster}/>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default LoginAdmin;
