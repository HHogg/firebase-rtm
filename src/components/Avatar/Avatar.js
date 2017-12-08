import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import Base from '../Base/Base';
import './Avatar.css';

export default class Avatar extends Component {
  static propTypes = {
    bounce: PropTypes.bool,
    color: PropTypes.oneOf(['blue', 'green', 'red']).isRequired,
    flash: PropTypes.bool,
    url: PropTypes.string.isRequired,
  };

  render() {
    const { bounce, color, flash, url } = this.props;
    const classes = classnames('Avatar', `Avatar--${color}`, {
      'Avatar--bounce': bounce,
      'Avatar--flash': flash,
    });

    return (
      <Base
          Component="img"
          className={ classes }
          src={ url } />
    );
  }
}
