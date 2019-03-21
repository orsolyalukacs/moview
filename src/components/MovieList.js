import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ButtonPrimary from './Button';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '800',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
});

class MovieList extends Component {
  viewDetails() {
    const {movie} = this.props;
    const url = "https://www.themoviedb.org/movie/" + movie.id;
    window.open(
        url,
        '_blank'
    );
  };

  viewRelated() {
    const {movie} = this.props;
    const discoverUrl = "https://api.themoviedb.org/3/movie/" + movie.id + "/similar?api_key=2ab787a73e407248e50ffd9242bd638f&language=en-US&page=1";
    window.open(
        discoverUrl,
        '_blank'
    );
  };

  render() {
    const {classes, movie } = this.props;
    return (
        <List className={classes.root}>
          <ListItem alignItems="flex-start">
            <img alt="poster" src={movie.poster_path}/>
            <ListItemText
                primary={
                  <Fragment>
                    <ButtonPrimary
                        variant="outlined"
                        color="primary"
                        className={classes.block}
                        label={movie.title}
                        onClickHandler={this.viewDetails.bind(this)}
                        value="Details">
                    </ButtonPrimary>
                    <Typography component="p"
                                color="textPrimary">
                      {movie.overview}
                    </Typography>
                    <Typography component="ul" className="movie-data-list" color="textSecondary">
                      <li>original release: {movie.release_date}</li>
                      <li>popularity: {movie.popularity}</li>
                      <li>original language: {movie.original_language}</li>
                    </Typography>
                    <ButtonPrimary
                        variant="text"
                        color="primary"
                        className={classes.block}
                        label="Related"
                        onClickHandler={this.viewRelated.bind(this)}
                        value="Related">
                    </ButtonPrimary>
                  </Fragment>
                }
            />
          </ListItem>
        </List>
    );
  }
}

MovieList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MovieList);
