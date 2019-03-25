import React, { Component } from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import config from './config';
import SearchAppBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import MovieCard from './components/MovieCard';

const tmdbKey = config.TMDB_KEY;
const searchExp = `?api_key=${tmdbKey}&query=`;
const baseUrl = 'https://api.themoviedb.org/3/';
const posterBaseUrl = 'https://image.tmdb.org/t/p/w185';
const placeholderImg = 'https://www.freeiconspng.com/uploads/no-image-icon-23.jpg';
const searchMovieTerm = `search/movie?api_key=${tmdbKey}&query=`;
const similarMovie = `/similar?api_key=${tmdbKey}`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requestFailed: false,
      isLoading: false,
      initialState: true,
    };
    this.keyPress = this.keyPress.bind(this);
    this.searchMovie = this.searchMovie.bind(this);
  }

  searchMovie = (searchTerm, searchExp, searchType) => {
    let url;
    this.setState({
      initialState: false,
      isLoading: true,
    });

    if (searchType === 'related') {
      url = `${baseUrl}movie/${searchTerm}${similarMovie}`;
    } else if (searchType === 'movie') {
      url = baseUrl + searchMovieTerm + searchTerm;
    } else {
      return null;
    }

    axios
      .get(url)
      .then(res => {
        this.fetchData(res);
        this.setState({
          isLoading: false,
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          requestFailed: true,
          isLoading: false,
        });
      });
  };

  fetchData(res) {
    const movies = res.data;
    const { results } = movies;

    this.renderResults(results);
    this.errorHandling(results);
  }

  errorHandling(results) {
    if (results.length < 1) {
      this.setState({
        requestFailed: true,
      });
    } else {
      this.setState({
        requestFailed: false,
      });
    }
  }

  keyPress(event) {
    if (event.keyCode === 13) {
      const searchTerm = event.target.value;
      if (searchTerm) {
        this.searchMovie(searchTerm, searchExp, 'movie');
      }
    }
  }

  renderResults(results) {
    const movieList = [];

    results.forEach(movie => {
      if (movie.poster_path) {
        movie.poster_path = posterBaseUrl + movie.poster_path;
      } else {
        movie.poster_path = placeholderImg;
      }
      const movieItem = <MovieCard key={movie.id} movie={movie} updateHandler={this.searchMovie} />;
      movieList.push(movieItem);
    });

    this.setState({ row: movieList });
  }

  render() {
    const { row, requestFailed, isLoading, initialState } = this.state;
    return (
      <div className="app">
        <SearchAppBar onKeyDownHandler={this.keyPress} />
        {initialState ? <div className="moview-logo" /> : null}
        {isLoading ? (
          <div className="spinner" />
        ) : requestFailed ? (
          <Paper className="error" elevation={1}>
            <Typography variant="h6" color="inherit">
              No movies found.
            </Typography>
          </Paper>
        ) : (
          <MovieGrid row={row} />
        )}
      </div>
    );
  }
}

export default App;
