import ToggleButton from '@material-ui/lab/ToggleButton';

import { withStyles } from '@material-ui/styles';

/**
 * ToggleButton com alguns estilos customizados.
 *
 * @author Rafael
 */
const ToggleButtonLink = withStyles({
  root: {
    marginTop: '10px',
    marginBottom: '10px',
    color: '#3F51B5',
    textDecorationStyle: '-moz-none',
    '&:hover': {
      color: '#FFF',
      backgroundColor: '#3F51B5',
    },
    '&$selected': {
      color: '#FFF',
      backgroundColor: '#3F51B5',
      '&:hover': {
        color: '#FFF',
        backgroundColor: '#4648CC',
      },
    },
  },
  selected: {},
})(ToggleButton);

export default ToggleButtonLink;
