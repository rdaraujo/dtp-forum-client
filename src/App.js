import './assets/index.css';

import Header from './components/Header';
import Home from './components/Home';
import Categoria from './components/Categoria';

import { BrowserRouter, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <hr />
      <Route exact path="/" component={Home} />
      <Route path="/:categoria" component={Categoria} />
    </BrowserRouter>
  );
};

export default App;
