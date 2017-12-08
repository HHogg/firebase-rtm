import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import './Base.css';

export default class Base extends Component {
  static propTypes = {
    Component: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string,
    ]),
    className: PropTypes.string,
    container: PropTypes.bool,
    margin: PropTypes.oneOf(['x1', 'x2', 'x3', 'x4', 'x6']),
    maxWidth: PropTypes.string,
    padding: PropTypes.oneOf(['x1', 'x2', 'x3', 'x4', 'x6']),
  };

  static defaultProps = {
    Component: 'div',
  };

  render() {
    const {
      Component,
      className,
      container,
      maxWidth,
      padding,
      margin,
      ...rest
    } = this.props;

    const classes = classnames('Base', {
      'Base--container': container,
      'Base--max-width': maxWidth,
      [`Base--margin-${margin}`]: margin,
      [`Base--padding-${padding}`]: padding,
    }, className);

    return (
      <Component { ...rest } className={ classes } style={ { maxWidth } } />
    );
  }
}
