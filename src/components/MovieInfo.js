import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ButtonPrimary from './ButtonPrimary';

const styles = {
  dialog: {
    justifyContent: 'space-around',
  },
};

class MovieInfo extends Component {
  openWikiPage = () => {
    const { wikiPageId } = this.props;
    const url = `https://en.wikipedia.org/?curid=${wikiPageId}`;
    window.open(url, '_blank');
  };

  openImdbPage = () => {
    const { movie } = this.props;
    const url = `https://www.themoviedb.org/movie/${movie.id}`;
    window.open(url, '_blank');
  };

  render() {
    const { movieInfo, movie, dataFrom, classes, open, handleClose, showWikiLink } = this.props;
    const releaseYear = movie.release_date.slice(0, 4);

    return (
      <div id="movie-info-wrapper">
        <Dialog
          maxWidth="sm"
          className="movie-info-modal"
          aria-labelledby="responsive-dialog-title"
          open={open}
          onClose={handleClose}
        >
          <DialogTitle id="responsive-dialog-title">
            {movie.title} ({releaseYear} film)
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {movieInfo}
              <br />
              <sub>/from {dataFrom}/</sub>
            </DialogContentText>
          </DialogContent>
          <DialogActions className={classes.dialog}>
            {showWikiLink ? (
              <ButtonPrimary
                label="Wikipedia"
                onClickHandler={this.openWikiPage}
                value="Wikipedia"
              />
            ) : null}
            <ButtonPrimary
              color="secondary"
              label="TMDb"
              onClickHandler={this.openImdbPage}
              value="TMDb"
            />
            <ButtonPrimary onClickHandler={handleClose} label="Close">
              Close
            </ButtonPrimary>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

MovieInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  movie: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  dataFrom: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(MovieInfo);
