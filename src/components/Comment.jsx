import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Comment extends Component {
  render() {
    const { rating, email, message } = this.props;
    return (
      <div>
        <p data-testid="review-card-email">{email}</p>
        <span data-testid="review-card-rating">{rating}</span>
        <p data-testid="review-card-evaluation">{message}</p>
      </div>
    );
  }
}

Comment.propTypes = {
  rating: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
