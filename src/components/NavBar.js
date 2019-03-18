import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const NavBar = () => {
  return(
      <div>
        <AppBar className="app-header" position="static">
          <Toolbar>
            <Typography className="app-title" variant="title" color="inherit">
              Moview
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
  )
};
export default NavBar;
