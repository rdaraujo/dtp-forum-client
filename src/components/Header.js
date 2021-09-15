import { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getCategorias } from '../api/categorias';

import HomeIcon from '@material-ui/icons/Home';
import CategoryIcon from '@material-ui/icons/Category';
import { Grid } from '@material-ui/core';

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
          <Grid container direction="row" alignItems="center" justifyContent="flex-start">

            <Grid item>
              <Link to="/" className="menuCategorias">
                <HomeIcon fontSize="inherit"/>
              </Link>
            </Grid>

            {categorias.map((categoria) => (
              <Grid item>
                <Link to={`/${categoria.path}`} key={categoria.path} className="menuCategorias">
                  <CategoryIcon fontSize="inherit"/>
                  {categoria.nome}
                </Link>
              </Grid>
            ))}
          </Grid>

        </div>
      </div>
    );
  }
}

export default withRouter(Header);
