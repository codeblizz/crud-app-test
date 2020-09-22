import React, {  } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../../Redux/Actions/ActionCreators/authActions";
import classnames from "classnames";
import { Form, Row, Card } from 'react-bootstrap';
// import { useForm, Controller } from "react-hook-form";
import  "../../UserModule/Login/login.css";

class Register extends React.Component{
  // const { control, handleSubmit, register, form } = useForm();
  constructor(props){
    super(props)
    this.state = { 
        email: "",  
        emailConfirm: "",   
        password: "", 
        role: "",
        errors: {} 
  }} 

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/flight");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  // useEffect(() => {
  //   if (props.auth.isAuthenticated) {
  //     props.history.push("/flight");
  //   }
  // }, [])

  // useEffect(() => {
  //   if (props.errors) {
  //     setState({
  //       errors: props.errors
  //     });
  //   }
  // }, [props.errors])

  onSubmit = (e) => {
    e.preventDefault();
    const newUser = { 
      email: this.state.email,
      emailConfirm: this.state.emailConfirm, 
      password: this.state.password, 
      role: this.state.role       
    };
    this.props.registerUser(newUser, this.props.history)
    // ? addToast('Registration successfully', { autoDismiss: true, autoDismissTimeout: '5000' })          
    // : addToast('Registration failed', { autoDismiss: true, autoDismissTimeout: '5000' })
  };

  render(){
    const {errors} = this.state;
    return (   
        <div>   
            <form
              className="login-card" 
              // form={form}
              name="register"
              scrollToFirstError
              noValidate  
              onSubmit={this.onSubmit}
            >
            <Card
              className="card"
              orientation="center" 
              style={{ width: "30vw" }}
            >
            <div>
              <Row className="row-register"><h4>Register Page</h4></Row>
              <Row className="row-register">
                {/* <Controller
                  control={control}
                  register={register}
                  defaultValue=""
                  as={
                    <> */}
                      <Form.Group controlId="email">
                        <Form.Control
                          type="email"
                          placeholder="Enter your email"
                          name="email"  
                          value={this.state.value}
                          onChange={this.onChange}
                          style={{width: "16rem"}}
                          className={classnames("", {
                              invalid: errors.email
                          })} 
                        /> 
                      </Form.Group>
                      <span className="red-text">{errors.email}</span>
                    {/* </>
                  }/> */}
                </Row>
                <Row className="row-register">
                {/* <Controller
                  control={control}
                  register={register}
                  defaultValue=""
                  as={
                    <> */}
                      <Form.Group controlId="emailConfirm">
                        <Form.Control
                          type="email"
                          placeholder="Confirm email"
                          name="emailConfirm"
                          value={this.state.value}
                          onChange={this.onChange}
                          style={{width: "16rem"}}
                          className={classnames("", {
                          invalid: errors.emailConfirm
                          })}
                        />
                      </Form.Group>
                      <span className="red-text">{errors.emailConfirm}</span>
                    {/* </>
                  }/>                                 */}
                </Row>
                <Row className="row-register">
                  {/* <Controller
                    control={control}
                    register={register}
                    defaultValue=""
                    as={
                      <> */}
                        <Form.Group controlId="password">
                          <Form.Control
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            value={this.state.value}
                            onChange={this.onChange}
                            style={{width: "16rem"}}
                            className={classnames("", {
                              invalid: errors.password
                            })}
                          />
                        </Form.Group>
                        <span className="red-text">{errors.password}</span>
                      {/* </>
                  }/>   */}
                </Row>
                <Row className="row-register">
                  {/* <Controller
                    control={control}
                    register={register}
                    defaultValue=""
                    as={
                      <> */}
                        <Form.Group controlId="role">
                          <Form.Control 
                            as="select" custom
                            name="role"
                            value={this.state.value}
                            onChange={this.onChange}
                            style={{width: "16rem"}}
                            className={classnames("", {
                              invalid: errors.role
                            })
                        }>
                            <option>Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                          </Form.Control>
                        </Form.Group>
                        <span className="red-text">{errors.role}</span>
                      {/* </>
                  }/>   */}
                </Row>
                <Row className="row-register">
                  <button
                    style={{
                      backgroundColor: "#3F72AF",
                      marginTop: "25px",
                      color: "#ffffff",
                      fontSize: 20,
                      textAlign: "center",
                      width: "16rem",
                      height: 35,
                      borderColor: "#3F72AF",
                      borderRadius: "3px",
                    }}
                    block 
                    type="submit" 
                  >
                    Register 
                  </button>   
                </Row>
                <Row style={{display: "flex", justifyContent: "center" }}>
                  <h6 style={{fontWeight: "light"}} >Already have an account? <Link to="/" style={{color: "#3F72AF", fontWeight:"bold"}} >Sign in</Link>.</h6>
                </Row> <br/>
          </div>
        </Card>
      </form>  
  </div>
)}}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register)); 