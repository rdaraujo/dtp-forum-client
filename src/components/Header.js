import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import HomeIcon from '@material-ui/icons/Home';
import makeStyles from '@material-ui/styles/makeStyles';
import { Link } from 'react-router-dom';
import { getCategorias } from '../api/categorias';
import { useState } from 'react';
import { useEffect } from 'react';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles( theme => ({
  menuCategorias: {
    color: '#3F51B5',
    textDecorationStyle : '-moz-none',
  }
}))

const Header = () => {
  const [categorias, setCategorias] = useState([]);

  const classes = useStyles();

  useEffect( () => {
    getCategorias().then( categorias => setCategorias(categorias) );
  }, [])

  return (
    <div>
      <Typography variant="h4">DTP Forum Client</Typography>
      <div>
        <ButtonGroup size="small" color="primary" aria-label="small outlined primary button group">
          <Button>
            <Link to="/" className="menuCategorias"><HomeIcon fontSize="inherit"/></Link>
          </Button>
          {categorias.map( categoria => (
            <Button key={categoria.path}>
              <Link to={`/${categoria.path}`} className={classes.menuCategorias}>{categoria.nome}</Link>
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
}

export default Header;
