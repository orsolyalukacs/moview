import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import styles from '../utils/styles';
import theme from '../utils/theme';
import SearchIcon from '@material-ui/icons/Search';

function SearchAppBar(props) {
  const { classes, searchHandler } = props;
  return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                    onChange={searchHandler}
                    placeholder="Search movies…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                />
              </div>
              <div className={classes.grow} />
              <IconButton className={classes.menuButton} color="inherit" aria-label="tmdb-icon">
                <img src="https://www.themoviedb.org/assets/2/v4/logos/408x161-powered-by-rectangle-green-bb4301c10ddc749b4e79463811a68afebeae66ef43d17bcfd8ff0e60ded7ce99.png" alt="tmdb-icon" height="50"/>
              </IconButton>
              <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                Moview
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
      </MuiThemeProvider>
  );
}

SearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (withStyles)(styles)(SearchAppBar);
