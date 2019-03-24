import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from './Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = ({
  dialog: {
    justifyContent: 'space-around',
  },
});

class MovieInfo extends Component {
  openWikiPage = () => {
    const {wikiPageId} = this.props;
    const url = "https://en.wikipedia.org/?curid=" + wikiPageId;
    window.open(
        url,
        '_blank'
    );
  };

  openImdb = () => {
    const {movie} = this.props;
    const url = "https://www.themoviedb.org/movie/" + movie.id;
    window.open(
        url,
        '_blank'
    );
  };

  render() {
    const { movieInfo, movie, dataFrom, isLoading, classes, open, handleClose } = this.props;
    const release_year = (movie.release_date).slice(0, 4);

    return (
        <div id="movie-info-wrapper">
            <Dialog
                maxWidth="sm"
                className="movie-info-modal"
                aria-labelledby="responsive-dialog-title"
                open={open}
                onClose={handleClose}
            >
              {isLoading ?
                <div className="spinner"/>
                :
                <Fragment>
                  <DialogTitle id="responsive-dialog-title">
                    {movie.title} ({release_year} film)
                  </DialogTitle>
                  <DialogContent>
                      <DialogContentText>
                        {movieInfo}
                        <br/>
                        <sub>/from {dataFrom}/</sub>
                      </DialogContentText>
                  </DialogContent>
                  <DialogActions
                      className={classes.dialog}>
                    <Button
                        variant="text"
                        color="primary"
                        label="Wikipedia"
                        onClickHandler={this.openWikiPage}
                        value="Wikipedia">
                    </Button>
                    <Button
                        variant="text"
                        color="secondary"
                        label="TMDb"
                        onClickHandler={this.openImdb}
                        value="TMDb">
                    </Button>
                    <Button
                        onClickHandler={handleClose}
                        color="primary"
                        label="Close">
                      Close
                    </Button>
                  </DialogActions>
                </Fragment>
                }
            </Dialog>
        </div>
    );
  }
}

export default  withStyles(styles)(MovieInfo);
