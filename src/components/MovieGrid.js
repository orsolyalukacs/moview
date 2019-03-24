import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  demo: {
    height: 320,
  },
});

class MovieGrid extends Component {
  state = {
    direction: 'row',
    justify: 'center',
    alignItems: 'center',
  };

  render(){
    const { row, classes } = this.props;
    const { alignItems, direction, justify } = this.state;

    return (
        <Grid container spacing={24} className={classes.root}>
          <Grid item xs="auto">
            <Grid
                container
                spacing={16}
                className={classes.demo}
                alignItems={alignItems}
                direction={direction}
                justify={justify}
            >
              {row}
            </Grid>
          </Grid>
        </Grid>
    );
  }
}

MovieGrid.propTypes = {
  row: PropTypes.array,
};

export default withStyles(styles)(MovieGrid);

