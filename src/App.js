import React, { Component } from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import SearchAppBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import MovieList from './components/MovieList'

const searchExp = "?api_key=2ab787a73e407248e50ffd9242bd638f&query=";
const baseUrl = "https://api.themoviedb.org/3/";

class App extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      requestFailed: false,
      isLoading: false,
      showWikiDetails: false,
      movieInfo: [],
      wikiPageId: '',
      dataFrom: '',
    };
    this.searchMovie('Shrek', searchExp, 'movie');
  }

  componentDidMount() {
    this._isMounted = true;
  }

  // Error handling if there is no result found.
  errorMessage(results) {
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
      if (movie.poster_path) {
        movie.poster_path="https://image.tmdb.org/t/p/w185" + movie.poster_path;
      } else {
        movie.poster_path="https://www.freeiconspng.com/uploads/no-image-icon-23.jpg";
      }
      const movieItem = <MovieList key={movie.id} movie={movie} updateHandler={this.searchMovie.bind(this)} />
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
  searchMovie = (searchTerm, searchExp, searchType) => {
    let url;
    if (this._isMounted) {
      this.setState({isLoading: true});
    }

    if (searchType === 'related') {
      url =  baseUrl + "movie/" + searchTerm + "/similar?api_key=2ab787a73e407248e50ffd9242bd638f";
    }
    else if(searchType === 'movie') {
      url = baseUrl + "search/movie?api_key=2ab787a73e407248e50ffd9242bd638f&query=" + searchTerm;
    } else {
      return null;
    }

    axios.get(url)
        .then(res => {
          this.fetchData(res);
            this.setState({
              isLoading: false,
            });
        })
        .catch((error) => {
          console.log(error);
            this.setState({
            requestFailed: true,
            isLoading: false
          });
        })
    };

  // Starts search when enter is pressed in the SearchBar.
  keyPress = (event) => {
    if(event.keyCode === 13) {
      const searchTerm = event.target.value;
      this.searchMovie(searchTerm, searchExp, 'movie');
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { row, requestFailed, isLoading } = this.state;
    return (
        <div className="app">
          <SearchAppBar
              onKeyDownHandler={this.keyPress}
          />
          { isLoading?
               <div className="spinner"/>
              :
            requestFailed?
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
