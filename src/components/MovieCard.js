import React, { Fragment, Component } from 'react';
import axios from 'axios';
import ISO6391 from 'iso-639-1';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import config from '../config';
import ButtonPrimary from './ButtonPrimary';
import MovieInfo from './MovieInfo';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '800',
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    maxWidth: 200,
  },
  media: {
    height: 256,
    maxWidth: 200,
  },
});

const tmdbKey = config.TMDB_KEY;
const wikiQueryTitle = 'https://en.wikipedia.org/w/api.php?action=query&titles=';
const relatedTerm = `/similar?api_key=${tmdbKey}`;
const wikiExp = '&prop=extracts&exintro&explaintext&rvprop=content&origin=*&format=json';

class MovieCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieInfo: [],
      wikiPageId: '',
      dataFrom: '',
      open: false,
    };
  }

  // Query sent to the Wikipedia API
  wikiDetails = () => {
    const { movie } = this.props;
    const wikiSearchUrl = wikiQueryTitle + movie.title + wikiExp;

    axios
      .get(wikiSearchUrl)
      .then(res => {
        this.fetchWikiExtract(res);
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  // Sends related flag to fetch function in the App
  relatedHandler = () => {
    const { updateHandler, movie } = this.props;
    updateHandler(movie.id, relatedTerm, 'related');
  };

  // Closes the modal
  handleClose = () => {
    this.setState({ open: false });
  };

  // Gets movie extract from Wikipedia API if available
  fetchWikiExtract(res) {
    const obj = res.data.query.pages;
    const { extract } = obj[Object.keys(obj)[0]];

    if (extract) {
      const pageId = obj[Object.keys(obj)[0]].pageid;
      this.setState({
        movieInfo: extract,
        dataFrom: 'wikipedia',
        wikiPageId: pageId,
        open: true,
      });
    } else {
      this.checkWikiExtract();
    }
  }

  // Shows IMDB overview if Wiki extract is not available
  checkWikiExtract() {
    const { movie } = this.props;

    if (movie.overview) {
      this.setState({
        movieInfo: movie.overview,
        dataFrom: 'TMDb',
        open: true,
      });
    } else {
      this.setState({
        movieInfo: 'There is no information found.',
        dataFrom: 'TMDb',
        open: true,
      });
    }
  }

  render() {
    const { movieInfo, dataFrom, wikiPageId, open } = this.state;
    const { classes, movie } = this.props;
    const releaseYear = movie.release_date.slice(0, 4);
    const language = ISO6391.getName(movie.original_language);

    return (
      <Card className={classes.card} id="card" spacing={24}>
        <CardMedia
          className={classes.media}
          title="poster"
          image={movie.poster_path}
          alt="poster-image"
        />
        <CardContent>
          <Fragment>
            <ButtonPrimary
              variant="contained"
              color="secondary"
              size="small"
              className="button-title"
              label={movie.title}
              onClickHandler={this.wikiDetails}
              value="Wikipedia extract"
            />
            <MovieInfo
              movieInfo={movieInfo}
              movie={movie}
              dataFrom={dataFrom}
              wikiPageId={wikiPageId}
              handleClose={this.handleClose}
              open={open}
            />
            <Typography component="ul" className="movie-data-list" color="textSecondary">
              <li>original release: {releaseYear}</li>
              <li>popularity: {movie.popularity}</li>
              <li>original language: {language}</li>
            </Typography>
            <CardActions className="movie-info-buttons">
              <ButtonPrimary
                className={classes.block}
                label="Related"
                onClickHandler={this.relatedHandler}
                value="Related"
              />
            </CardActions>
          </Fragment>
        </CardContent>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  classes: PropTypes.object.isRequired,
  movie: PropTypes.object.isRequired,
  updateHandler: PropTypes.func.isRequired,
};

export default withStyles(styles)(MovieCard);
