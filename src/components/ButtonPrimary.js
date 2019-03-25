import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider } from '@material-ui/core';
import theme from '../utils/theme';

class ButtonPrimary extends Component {
  render() {
    const { label, color, variant, onClickHandler, size } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <Button color={color} variant={variant} onClick={onClickHandler} size={size}>
          {label}
        </Button>
      </MuiThemeProvider>
    );
  }
}

ButtonPrimary.propTypes = {
  label: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  color: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
};

ButtonPrimary.defaultProps = {
  color: 'primary',
  variant: 'text',
  size: 'medium',
};

export default ButtonPrimary;
