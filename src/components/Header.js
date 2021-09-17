import { Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCategorias } from '../api/categorias';
import ToggleButtonLink from './custom/ToggleButtonLink';

const Header = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaAtual, setCategoriaAtual] = useState('');

  const location = useLocation();

  useEffect(() => {
    getCategorias().then((categorias) => setCategorias(categorias));
    setCategoriaAtual(location.pathname.substring(1));
  }, [location]);

  const handleCategoriaAtual = (event, categoria) => {
    setCategoriaAtual(categoria);
  };

  return (
    <div>
      <Typography variant="h4">DTP Forum Client</Typography>
      <ToggleButtonGroup size="small" value={categoriaAtual} exclusive onChange={handleCategoriaAtual}>
        <ToggleButtonLink value="" component={Link} to="/">
          <HomeIcon fontSize="inherit" />
        </ToggleButtonLink>
        {categorias.map( categoria => (
          <ToggleButtonLink key={categoria.path} value={categoria.path} component={Link} to={`/${categoria.path}`}>
            {categoria.nome}
          </ToggleButtonLink>
        ))}
      </ToggleButtonGroup>
    </div>
  );
};

export default Header;
