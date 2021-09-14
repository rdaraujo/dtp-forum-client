import { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getCategorias } from '../api/categorias';

import HomeIcon from '@material-ui/icons/Home';

class Header extends Component {
  state = {
    categorias: [],
  };

  componentDidMount() {
    getCategorias().then((categorias) => this.setState({ categorias }));
  }

  render() {
    const { categorias } = this.state;

    return (
      <div>
        <div>
          <h1>DTP Forum Client</h1>
        </div>
        <div>
          <Link to="/" className="menuCategorias">
            <HomeIcon fontSize="inherit"/>
          </Link>
          {categorias.map((categoria) => (
            <Link to={`/${categoria.path}`} key={categoria.path}>
              <p className="menuCategorias">{categoria.nome}</p>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
