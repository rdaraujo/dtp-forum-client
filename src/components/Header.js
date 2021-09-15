import { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getCategorias } from '../api/categorias';

import HomeIcon from '@material-ui/icons/Home';
import CategoryIcon from '@material-ui/icons/Category';
import { Grid } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

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
          <ButtonGroup size="small" color="primary" aria-label="small outlined primary button group">
            <Button>
              <Link to="/" className="menuCategorias"><HomeIcon fontSize="inherit"/></Link>
            </Button>
            {categorias.map((categoria) => (
              <Button>
                <Link to={`/${categoria.path}`} key={categoria.path} className="menuCategorias">{categoria.nome}</Link>
              </Button>
            ))}
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
