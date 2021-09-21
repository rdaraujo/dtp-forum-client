import { Typography } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Categoria from './components/Categoria';
import Header from './components/Header';
import Home from './components/Home';
import PostForm from './components/PostForm';
import makeStyles from '@material-ui/styles/makeStyles';
import PostView from './components/PostView';

const useStyles = makeStyles( theme => ({
  hr: {
    margin: '10px 20px 10px auto',
  }
}))

const App = () => {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <Header />
      <hr className={classes.hr}/>
      <Switch>
        <Route path="/novo-post">
          <PostForm/>
        </Route>
        <Route path="/post/:postId/edit">
          <PostForm/>
        </Route>
        <Route path="/:categoria/:postId">
          <PostView/>
        </Route>
        <Route path="/:categoria">
          <Categoria/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
        <Route>
          <Typography variant='h5'>Página não encontrada.</Typography>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
