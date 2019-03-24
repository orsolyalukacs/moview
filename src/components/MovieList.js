import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ButtonPrimary from './Button';
import 'whatwg-fetch';
import MovieInfo from './MovieInfo';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '800',
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 256,
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
      WikiPageID: '',
      isLoading: false,
    }
}
  openImdb() {
    const {movie} = this.props;
    const url = "https://www.themoviedb.org/movie/" + movie.id;
    window.open(
        url,
        '_blank'
    );
  };

  openWikiPage() {
    const {wikiPageId} = this.state;
    const url = "https://en.wikipedia.org/?curid=" + wikiPageId;
    window.open(
        url,
        '_blank'
    );
  }

  // Query sent to the Wikipedia API
  wikiDetails() {
    const {movie} = this.props;
    const wikiSearchUrl = wikiQueryTitle + movie.title + wikiExp;
    this.setState({
      showWikiDetails: true,
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
  }

  // Gets movie extract from Wikipedia API
  fetchWikiExtract(json) {
    let obj = json.query.pages;
    let extract = obj[Object.keys(obj)[0]].extract;

    if (extract) {
      // let trimExtract = (extract.substr(0,180) + '...');
      // console.log(trimExtract);
      this.setState({ movieInfo: extract });
    } else {
      this.checkWikiExtract();
    }

    let pageId = obj[Object.keys(obj)[0]].pageid;
    this.setState({ wikiPageId: pageId });
  }

// Shows IMDB overview if Wiki extract is not available
  checkWikiExtract(){
    const { movie } = this.props;
    this.setState({ movieInfo: movie.overview});
  }

  // Sends related flag to fetch function in the App
  relatedHandler() {
    const {updateHandler, movie} = this.props;
    updateHandler(movie.id, relatedTerm, 'related' );
  }

  render() {
    const { showWikiDetails, movieInfo, isLoading } = this.state;
    const { classes, movie } = this.props;
    return (
        <Fragment>
        <Card className={classes.card} id="card" spacing={24}>
          <CardMedia className={classes.media} title="poster" image={movie.poster_path}/>
          <CardContent>
            <Fragment>
              <ButtonPrimary
                variant="contained"
                color="secondary"
                className="button-title"
                label={movie.title}
                onClickHandler={this.wikiDetails.bind(this)}
                value="Wikipedia extract">
              </ButtonPrimary>
              { showWikiDetails ?
                  <Fragment>
                    { isLoading ?
                        <div className="spinner"/>
                      :
                      <MovieInfo movieInfo={movieInfo} movie={movie}/>
                    }
                   <CardActions className="movie-info-buttons">
                      <ButtonPrimary
                        variant="text"
                        color="primary"
                        className="title-button"
                        label="Imdb"
                        onClickHandler={this.openImdb.bind(this)}
                        value="Imdb">
                       </ButtonPrimary>
                      <ButtonPrimary
                        variant="text"
                        color="secondary"
                        className={classes.block}
                        label="Wikipedia"
                        onClickHandler={this.openWikiPage.bind(this)}
                        value="Wikipedia">
                      </ButtonPrimary>
                      <ButtonPrimary
                        variant="text"
                        color="primary"
                        className={classes.block}
                        label="Related"
                        onClickHandler={this.relatedHandler.bind(this)}
                        value="Related">
                      </ButtonPrimary>
                   </CardActions>
                  </Fragment>
               : null }
              <Typography component="ul" className="movie-data-list" color="textSecondary">
                <li>original release: {movie.release_date}</li>
                <li>popularity: {movie.popularity}</li>
                <li>original language: {movie.original_language}</li>
              </Typography>
            </Fragment>
          </CardContent>
        </Card>
        </Fragment>
    );
  }
}

MovieList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MovieList);
