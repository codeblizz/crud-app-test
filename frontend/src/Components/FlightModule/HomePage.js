import React from "react";
import {
  BrowserRouter as Router,
  Route, Link,
  useRouteMatch,
} from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import DisplayFlight from "./DisplayFlight";
import EditFlight from "./EditFlight";
import AddFlight from "./AddFlight";
import DisplayUsers from "./DisplayUsers";
import Header from "./Header";
import { useToasts } from 'react-toast-notifications';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../Redux/Actions/ActionCreators/authActions";


const HomePage = (props) => {
  const { path } = useRouteMatch();
  const { url } = useRouteMatch();
  const {addToast} = useToasts();
  const r1 = { 
    textAlign: "center", marginTop: "30px"
}
const onLogoutClick = e => {
    e.preventDefault(); 
    props.logoutUser(); 
    addToast(`Logged out as ${props.auth.user.email}`, { autoDismiss: true, autoDismissTimeout: '5000' })
};
  return ( 
    <Router>
      <Route
        exact
        path={path}
        render={() => (
          <div>
            <Row>
              <Col>
                <Header />
              </Col>
              <Col style={r1}>
                <Link 
                    to={{
                        pathname: `${url}/addflight`,
                        state: {}
                    }}
                >
                    <Button
                        variant="info"
                        style={{
                            backgroundColor: "#3F72AF",
                            fontSize: 15,
                            color: "#ffffff",
                            borderRadius: "3px",
                            height: "33px",
                            width: "210px",
                            border: "none",
                        }}
                    >
                        Click to add flight
                    </Button>
                  </Link>
                </Col>
                <Col style={r1}>
                  <Link 
                        to={{
                            pathname: `${url}/user`,
                            state: {}
                        }}
                  >
                    <Button 
                      variant="info"
                      style={{
                          backgroundColor: "#3F72AF",
                          fontSize: 15,
                          color: "#ffffff",
                          borderRadius: "3px",
                          height: "33px",
                          width: "210px",
                          border: "none",
                      }}
                    >
                    Display users
                  </Button>
                </Link>
                </Col>
                <Col style={r1}>
                    <Button
                        variant="danger"
                        size="large"
                        onClick={onLogoutClick} 
                        danger
                        style={{
                            fontWeight: "bold",
                            width: "150px",
                            height: "33px"
                        }}
                    >
                        Logout
                    </Button>
                </Col>
            </Row>
            <Row>
              <Col sm={12} md={16} lg={20} lg={24}>
                <DisplayFlight /> 
              </Col>
            </Row>
          </div>
        )}
      />
      <Route exact path={`${path}/addflight`} render={() => <AddFlight />} />
      <Route exact path={`${path}/edit/:id`} render={() => <EditFlight />} />
      <Route exact path={`${path}/user`} render={() => <DisplayUsers />} />
    </Router>
  );
};

HomePage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth 
});

export default connect(mapStateToProps,{ logoutUser })(HomePage);
