import { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getCategorias } from '../api/categorias';

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
          <Link to="/"><p className="menuCategorias">Home</p></Link>
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