import {createMuiTheme} from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#7e3ff2',
    },
    secondary: {
      main: '#dd33fa',
    }
  },
  typography: {
    useNextVariants: true,
  },
});

export default theme;
