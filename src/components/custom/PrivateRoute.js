import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { userLogged } from '../../config/constants.js';
import Header from '../Header';
import { Grid } from '@material-ui/core';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={ (props) =>
        userLogged()
        ? <Grid container alignItems="center">
            <Grid item xs={12}>
              <Header />
            </Grid>
            <Grid item xs={12}>
              <Component {...props} />
            </Grid>
          </Grid>
        : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
