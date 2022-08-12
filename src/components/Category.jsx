import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Category extends Component {
  render() {
    const { btnName, onClick } = this.props;
    return (
      <div>
        <label htmlFor="btnCategory">
          <button
            data-testid="category"
            className="buttonCategory"
            type="submit"
            id="btnCategory"
            onClick={ onClick }
          >
            {btnName}
          </button>
        </label>
      </div>
    );
  }
}

Category.propTypes = {
  btnName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
