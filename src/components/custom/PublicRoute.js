import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { userLogged } from '../../config/constants.js';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        userLogged() && restricted ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
