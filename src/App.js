import React, { Component } from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import SearchAppBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import MovieCard from './components/MovieCard'

const searchExp = "?api_key=2ab787a73e407248e50ffd9242bd638f&query=";
const baseUrl = "https://api.themoviedb.org/3/";

class App extends Component {
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
      initialState: true,
   };
   this.keyPress = this.keyPress.bind(this);
  }

  errorHandling(results) {
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

  renderResults(results) {
    const posterBaseUrl = "https://image.tmdb.org/t/p/w185";
    const placeholderImg = "https://www.freeiconspng.com/uploads/no-image-icon-23.jpg";
    let movieList = [];

    results.forEach((movie) => {
      if (movie.poster_path) {
        movie.poster_path=posterBaseUrl + movie.poster_path;
      } else {
        movie.poster_path=placeholderImg;
      }
      const movieItem = <MovieCard key={movie.id} movie={movie} updateHandler={this.searchMovie.bind(this)} />
      movieList.push(movieItem);
    });

    this.setState({row: movieList});
  }

  fetchData(res) {
    const movies = res.data;
    this.setState({ movies: res.data });

    const results = movies.results;

    this.renderResults(results);
    this.errorHandling(results);
  }

  searchMovie = (searchTerm, searchExp, searchType) => {
    let url;
    if (this._isMounted) {
      this.setState({
        initialState: false,
        isLoading: true
      });
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

  keyPress(event) {
    if(event.keyCode === 13) {
      const searchTerm = event.target.value;
      if (searchTerm) {
        this.searchMovie(searchTerm, searchExp, 'movie');
      }
    }
  };

  render() {
    const { row, requestFailed, isLoading, initialState } = this.state;
    return (
        <div className="app">
          <SearchAppBar
              onKeyDownHandler={this.keyPress}
          />
          { initialState?
            <div className="moview-logo">
            </div>
            : null
          }
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
              <MovieGrid row={row} />
          }
        </div>
    );
  }
}

export default App;
