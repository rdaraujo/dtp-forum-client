import { Button, Grid, TextField, makeStyles, Typography } from "@material-ui/core";
import { Fragment, useState } from "react";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles( theme => ({
  form: {
    maxWidth: '500px',
    margin: '0 auto',
    display: 'flex',
    background: '#E1E7F2',
    padding: '20px',
    marginTop: '30px',
    borderRadius: '20px',
  },
}))

const Login = () => {
  const classes = useStyles();
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const history = useHistory();

  const login = () => {
    localStorage.setItem('token', email)
    history.push('/');
  };

  return (
    <form onSubmit={login} className={classes.form}>
      <Grid container direction="row" spacing={3} justifyContent="center">
        <Grid item>
          <Typography variant="h4">DTP Forum Client</Typography>
        </Grid>
        <Grid item xs={12} xl={12}>
          <TextField id="email" type="text" label="E-mail" fullWidth margin="dense" size="small" value={email} onChange={(event) => setEmail(event.target.value)}/>
        </Grid>
        <Grid item xs={12} xl={12}>
          <TextField id="password" type="password" label="Password" fullWidth margin="dense" size="small" value={password} onChange={(event) => setPassword(event.target.value)} />
        </Grid>
        <Grid item xs={3} xl={3}>
          <Button type="button" color="primary" variant="contained" onClick={login} size="large">Entrar</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Login;
