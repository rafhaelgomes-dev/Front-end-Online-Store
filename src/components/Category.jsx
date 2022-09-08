import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Category.module.css';

export default class Category extends Component {
  render() {
    const { btnName, onClick } = this.props;
    return (
      <div>
        <button
          data-testid="category"
          className={ styles.buttonCategory }
          type="submit"
          id="btnCategory"
          onClick={ onClick }
        >
          {btnName}
        </button>
      </div>
    );
  }
}

Category.propTypes = {
  btnName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
