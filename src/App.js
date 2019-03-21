import React, { Component } from 'react';
import SearchAppBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import MovieList from './components/MovieList'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      requestFailed: false,
    };
    this.searchMovie('kexp');
  }

  componentDidMount() {
    this.searchMovie.bind(this);
    this.fetchData.bind(this);
  }

  // Error handling if there is no result found.
  errorMessage(results) {
    console.log(results);
    if (results.length < 1 ) {
      this.setState({
        requestFailed: true
      });
    } else {
      this.setState({
        requestFailed: false
      });
    }
  }

  // Renders a list of movies
  renderResults(results) {
    let movieList = [];
    results.forEach((movie) => {
      movie.poster_path="https://image.tmdb.org/t/p/w185" + movie.poster_path;
      const movieItem = <MovieList key={movie.id} movie={movie}/>
      movieList.push(movieItem);
    });
    this.setState({row: movieList});
  }

   // Fetches data from the Api
  fetchData(res) {
    const movies = res.data;
    this.setState({ movies: res.data });
    const results = movies.results;

    this.renderResults(results);
    this.errorMessage(results);
  }

  // Movie search function
  searchMovie(searchTerm){
    const searchExp = "?api_key=2ab787a73e407248e50ffd9242bd638f&query=";
    // const moviesBaseUrl = "https://api.themoviedb.org/3/movie/550?api_key=2ab787a73e407248e50ffd9242bd638f&query=";
    axios.get("https://api.themoviedb.org/3/search/movie" + searchExp + searchTerm)
        .then(res => {
          this.fetchData(res);
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            requestFailed: true
          });
        })
    }

  // Starts search when enter is pressed in the SearchBar.
  keyPress(event) {
    if(event.keyCode === 13) {
      const searchTerm = event.target.value;
      this.searchMovie(searchTerm);
    }
  }

  render() {
    const { row, requestFailed } = this.state;
    return (
      <div className="app">
        <SearchAppBar
            onKeyDownHandler={this.keyPress.bind(this)}
        />
        { requestFailed?
            <Paper className="error" elevation={1}>
              <Typography variant="h6" color="inherit">
               No movies found.
              </Typography>
            </Paper>
            :
            <ResultsList row={row} />
        }
      </div>
    );
  }
}

export default App;
