import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Categoria from './components/Categoria';
import Header from './components/Header';
import Home from './components/Home';
import PostForm from './components/PostForm';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <hr />
      <Switch>
        <Route path="/novo-post">
          <PostForm/>
        </Route>
        <Route path="/post/:postId">
          <PostForm/>
        </Route>
        <Route path="/:categoria">
          <Categoria/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
        <Route>
          <h1>Página não encontrada.</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
