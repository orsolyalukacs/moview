import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#7e3ff2',
    },
    secondary: {
      main: '#472bd7',
    },
  },
  typography: {
    useNextVariants: true,
  },
  spacing: [0, 2, 3, 5, 8],
});

export default theme;
