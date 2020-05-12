import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenService from '../../services/token-service';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        if (!TokenService.hasAuthToken()) {
            // not logged in so redirect to login page with the return url
            return (
              <Redirect 
                to={{ pathname: '/login', 
                state: { from: props.location } }} />
            )
        }

        // authorized so return component
        return <Component {...props} />
    }} />
)