import React, { Fragment, Component } from 'react';
import 'whatwg-fetch';
import ISO6391 from 'iso-639-1';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ButtonPrimary from './Button';
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
    maxWidth: 200
  },
});

const wikiQueryTitle = "https://en.wikipedia.org/w/api.php?action=query&titles=";
const relatedTerm = "/similar?api_key=2ab787a73e407248e50ffd9242bd638f";
const wikiExp = "&prop=extracts&exintro&explaintext&rvprop=content&origin=*&format=json";

class MovieList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showWikiDetails: false,
      movieInfo: [],
      wikiPageId: '',
      isLoading: false,
      dataFrom: '',
      open: false,
    }
}

  // Query sent to the Wikipedia API
  wikiDetails = () => {
    const {movie} = this.props;
    const wikiSearchUrl = wikiQueryTitle + movie.title + wikiExp;
    this.setState({
      isLoading: true,
    });

    fetch(wikiSearchUrl, {
      method: 'GET',
        })
        .then(response => response.json())
        .then(json => {
          this.fetchWikiExtract(json);
          this.setState({
            isLoading: false,
          });
        })
        .catch(err => {
          console.log(err.message);
          this.setState({
            isLoading: false,
          });
        })
  };

  // Gets movie extract from Wikipedia API if available
  fetchWikiExtract(json) {
    let obj = json.query.pages;
    let extract = obj[Object.keys(obj)[0]].extract;

    if (extract) {
      let pageId = obj[Object.keys(obj)[0]].pageid;
      this.setState({
        movieInfo: extract,
        dataFrom:  'wikipedia',
        wikiPageId: pageId,
        open: true,
      });
    } else {
      this.checkWikiExtract();
    }
  }

// Shows IMDB overview if Wiki extract is not available
  checkWikiExtract(){
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

  // Sends related flag to fetch function in the App
  relatedHandler = () => {
    const {updateHandler, movie} = this.props;
    updateHandler(movie.id, relatedTerm, 'related' );
  };


  // Closes the modal
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { movieInfo, isLoading, dataFrom, wikiPageId, open } = this.state;
    const { classes, movie } = this.props;
    const release_year = (movie.release_date).slice(0, 4);
    const language = (ISO6391.getName(movie.original_language));

    return (
        <Card className={classes.card} id="card" spacing={24}>
          <CardMedia className={classes.media} title="poster" image={movie.poster_path} alt="poster-image"/>
          <CardContent>
            <Fragment>
              <ButtonPrimary
                variant="contained"
                color="secondary"
                className="button-title"
                label={movie.title}
                onClickHandler={this.wikiDetails}
                value="Wikipedia extract">
              </ButtonPrimary>
                <MovieInfo
                    movieInfo={movieInfo}
                    movie={movie}
                    dataFrom={dataFrom}
                    isLoading={isLoading}
                    wikiPageId={wikiPageId}
                    handleClose={this.handleClose}
                    open={open}
                />
              <Typography component="ul" className="movie-data-list" color="textSecondary">
                <li>original release: {release_year}</li>
                <li>popularity: {movie.popularity}</li>
                <li>original language: {language}</li>
              </Typography>
              <CardActions className="movie-info-buttons">
                <ButtonPrimary
                    variant="text"
                    color="primary"
                    className={classes.block}
                    label="Related"
                    onClickHandler={this.relatedHandler}
                    value="Related">
                </ButtonPrimary>
              </CardActions>
            </Fragment>
          </CardContent>
        </Card>
    );
  }
}

MovieList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MovieList);
