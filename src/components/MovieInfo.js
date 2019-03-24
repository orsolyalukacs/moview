import React, { Component } from 'react';
import Button from './Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

class MovieInfo extends Component {
  state = {
    open: true,
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { movieInfo, movie, dataFrom } = this.props;
    const release_year = (movie.release_date).slice(0, 4);

    return (
        <div id="movie-info-wrapper">
          <Dialog
              maxWidth="sm"
              className="movie-info-modal"
              aria-labelledby="responsive-dialog-title"
              open={this.state.open}
              onClose={this.handleClose}
          >
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
              <DialogActions>
                <Button onClickHandler={this.handleClose}
                        color="primary"
                        label="Close">
                  Close
                </Button>
              </DialogActions>
          </Dialog>
        </div>
    );
  }
}

export default withMobileDialog()(MovieInfo);
