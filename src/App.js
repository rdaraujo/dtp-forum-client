import { Typography } from '@material-ui/core';
import { BrowserRouter, Switch } from 'react-router-dom';
import Categoria from './components/Categoria';
import PrivateRoute from './components/custom/PrivateRoute';
import PublicRoute from './components/custom/PublicRoute';
import Home from './components/Home';
import Login from './components/Login';
import PostForm from './components/PostForm';
import PostView from './components/PostView';

const App = () => {

  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute restricted={true} component={Login} path="/login" exact />
        <PrivateRoute component={PostForm} path="/novo-post" exact />
        <PrivateRoute component={PostForm} path="/post/:postId/edit" exact />
        <PrivateRoute component={PostView} path="/:categoria/:postId" exact />
        <PrivateRoute component={Categoria} path="/:categoria" exact />
        <PrivateRoute component={Home} path="/" exact />
        <PublicRoute restricted={false}>
          <Typography variant="h5">Página não encontrada.</Typography>
        </PublicRoute>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
