import React from "react";
import {Route, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          props.auth.isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/admin/signin",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
  PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
  };
  const mapStateToProps = state => ({
    auth: state.auth,
  });
  export default connect(
    mapStateToProps
  )(withRouter(PrivateRoute));