import React from 'react';
import {Container, Navbar, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../Redux/Actions/ActionCreators/authActions";

const Header = (props) =>  {
    const extra = { 
        color: "#dda0dd", fontStyle: "italic", 
        fontWeight: "bolder", width: "80%"
    } 
return (       
        <Container>                      
            <Row>
                <Col sm={12} md={16} lg={20} xl={24}> 
                    <Navbar.Brand>
                        <h2 style={extra}>Fly-Emirate</h2>
                    </Navbar.Brand>
                    <h6 style={{fontStyle: "italic", fontWeight: "lighter" }}>{props.auth.user.email}</h6> 
                </Col>
            </Row>     
        </Container>
    )
}

Header.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth 
  });

export default connect(mapStateToProps,{ logoutUser })(Header);