import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ButtonPrimary from './Button';
import 'whatwg-fetch';

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

const wikiQueryTitle = "https://en.wikipedia.org/w/api.php?action=query&titles=";
const relatedTerm = "/similar?api_key=2ab787a73e407248e50ffd9242bd638f";
const wikiExp = "&prop=extracts&exintro&explaintext&rvprop=content&origin=*&format=json";

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showWikiDetails: false,
      movieOverview: [],
      WikiPageID: '',
      isLoading: false,
    }
}
  viewDetails() {
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
  wikiHandler() {
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
  fetchWikiExtract(json){
    console.log(json);
    let obj = json.query.pages;
    this.setState({ wikiPageId: obj[Object.keys(obj)[0]].pageid });
    this.setState({ movieOverview: obj[Object.keys(obj)[0]].extract });
    console.log(this.state.movieOverview);
  }

  // Sends related flag to fetch function
  relatedHandler() {
    const {updateHandler, movie} = this.props;
    updateHandler(movie.id, relatedTerm, 'related' );
  }

  render() {
    const { showWikiDetails, movieOverview, isLoading } = this.state;
    const { classes, movie } = this.props;
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
                        onClickHandler={this.wikiHandler.bind(this)}
                        value="Wikipedia extract">
                    </ButtonPrimary>
                    { showWikiDetails ?
                        <Fragment>
                          {isLoading ?
                              <div className="spinner"/>
                              :
                              <Typography component="p"
                                          color="textPrimary">
                                {movieOverview}
                              </Typography>
                          }
                          <ButtonPrimary
                              variant="text"
                              color="secondary"
                              className={classes.block}
                              label="Imdb"
                              onClickHandler={this.viewDetails.bind(this)}
                              value="Imdb">
                            </ButtonPrimary>
                          <ButtonPrimary
                              variant="text"
                              color="primary"
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
                        </Fragment>
                     : null }
                    <Typography component="ul" className="movie-data-list" color="textSecondary">
                      <li>original release: {movie.release_date}</li>
                      <li>popularity: {movie.popularity}</li>
                      <li>original language: {movie.original_language}</li>
                    </Typography>
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
