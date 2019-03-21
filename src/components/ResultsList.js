import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ResultsList extends Component {
  render(){
    const { row } = this.props;
    return (
        <table>
          <tbody>
            <tr>
              <td>
                {row}
              </td>
            </tr>
          </tbody>
        </table>
    );
  }
}

ResultsList.propTypes = {
  row: PropTypes.array,
};

export default ResultsList;

