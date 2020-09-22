import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../../../Redux/Actions/ActionCreators/authActions";
import classnames from "classnames";
import "../login.css";
 
class LoginForm extends React.Component { 
  constructor(props){
    super(props)
    this.state = {      
          email: "", 
          password: "",  
          errors: {} ,    
    }}

componentDidMount() {  
  if (this.props.auth.isAuthenticated) {
    this.props.history.push("/flight");
  }
}

componentWillReceiveProps(nextProps) {
  if (nextProps.auth.isAuthenticated) {
    this.props.history.push("/flight"); 
  }if (nextProps.errors) {
    this.setState({
      errors: nextProps.errors
    });
  }
}
onChange = e => {
  this.setState({ [e.target.id]: e.target.value });
};

onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData) ? this.props.loginToaster() : this.props.logoutToaster()
  };

render() {
  const {errors} = this.state;
  return (
        <div> 
            <h3>Login Page</h3>
              <form 
                style={{marginTop: 35}} 
                onSubmit={this.onSubmit}
              > 
                <Form.Group as={Row} controlId="email">
                  <Form.Label column sm={4}>Email </Form.Label>
                  <Col sm={6}>
                    <Form.Control 
                      type="email" 
                      name="email"
                      value={this.state.value}
                      onChange={this.onChange}
                      placeholder="Enter email" 
                      style={{width: "14rem"}}
                      className={classnames("", {
                        invalid: errors.email || errors.emailnotfound
                      })}
                    />
                  </Col>
                </Form.Group>
                    <span className="red-text">{errors.email}{errors.emailnotfound}</span>
                  <Form.Group as={Row} controlId="password">
                    <Form.Label column sm={4}>Password</Form.Label>
                    <Col sm={6}>
                      <Form.Control 
                        type="password" 
                        name="password"
                        value={this.state.value}
                        onChange={this.onChange}
                        placeholder="Password"
                        style={{width: "14rem"}}
                        className={classnames("", {
                          invalid: errors.password || errors.passwordincorrect
                        })}
                      />
                    </Col>
                  </Form.Group>
                  <span className="red-text">{errors.password}{errors.passwordincorrect}</span>
                {/* </>
              }/> */}
              <Button
                style={{
                  backgroundColor: "#3F72AF",
                  marginTop: "12px",
                  color: "#ffffff",
                  width: "90%", 
                  borderRadius: "3px",
                }} 
                type="submit" 
              >
                Submit
              </Button>
              <span style={{ marginTop: "3vh", color: "#6461A0", display: "block" }}>
                Don't have an account!
              </span>          
          </form>
          <Link to="/signup" style={{ color: "#6461A0" }}>
              SignUp
          </Link>
    </div>
  );
}
}
LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors 
});
export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(LoginForm));