import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { userLogged } from '../constants';
import Header from '../Header';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={ (props) =>
        userLogged()
        ? <div>
            <Header />
            <Component {...props} />
          </div>
        : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
