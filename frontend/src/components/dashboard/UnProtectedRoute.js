import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from "react-redux";
import { withRouter } from 'react-router';

const UnProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            !isAuthenticated ?
                 <Component {...props}/> :
             <Redirect to={
                {
                    pathname: "/dashboard",
                    state: {
                        from: props.location
                    }
                }
            }/>
        )}
    />
);

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default withRouter(connect(
    mapStateToProps,
    null,
    null,
    { pure: false }
)(UnProtectedRoute));