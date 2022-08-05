import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Category extends Component {
  render() {
    const { btnName } = this.props;
    return (
      <div>
        <label htmlFor="btnCategory">
          <button data-testid="category" type="submit" id="btnCategory">{btnName}</button>
        </label>
      </div>
    );
  }
}

Category.propTypes = {
  btnName: PropTypes.string.isRequired,
};
