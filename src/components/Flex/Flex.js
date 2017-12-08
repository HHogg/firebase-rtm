import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import Base from '../Base/Base';
import './Flex.css';

export default class Flex extends Component {
  static propTypes = {
    alignChildrenHorizontal: PropTypes.oneOf(['start', 'middle', 'end', 'around', 'between']),
    alignChildrenVertical: PropTypes.oneOf(['start', 'middle', 'end', 'around', 'between']),
    alignSelf: PropTypes.oneOf(['start', 'middle', 'end']),
    className: PropTypes.string,
    direction: PropTypes.oneOf(['horizontal', 'vertical']),
    fromWidth: PropTypes.oneOf(['content', 'nothing']),
    gutter: PropTypes.oneOf(['x1', 'x2', 'x3', 'x4', 'x6']),
    shrink: PropTypes.bool,
  };

  render() {
    const {
      alignChildrenHorizontal,
      alignChildrenVertical,
      alignSelf,
      className,
      direction,
      fromWidth,
      gutter,
      shrink,
      ...rest
    } = this.props;

    const classes = classnames('Flex', {
      [`Flex--align-horz-${alignChildrenHorizontal}`]: alignChildrenHorizontal,
      [`Flex--align-self-${alignSelf}`]: alignSelf,
      [`Flex--align-vert-${alignChildrenVertical}`]: alignChildrenVertical,
      [`Flex--${direction}`]: direction,
      [`Flex--from-${fromWidth}`]: fromWidth,
      [`Flex--gutter-${gutter}`]: gutter,
      'Flex--shrink': shrink,
    }, className);

    return (
      <Base { ...rest } className={ classes } />
    );
  }
}
