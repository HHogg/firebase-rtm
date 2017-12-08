import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import Base from '../Base/Base';
import './Text.css';

const ComponentMap = {
  small: 'div',
  medium: 'h2',
  large: 'h1',
};

export default class Text extends Component {
  static propTypes = {
    Component: PropTypes.string,
    align: PropTypes.oneOf(['left', 'center', 'right']),
    breakOn: PropTypes.oneOf(['all', 'none', 'word']),
    className: PropTypes.string,
    color: PropTypes.oneOf(['blue', 'light', 'dark', 'red', 'green']),
    emphasise: PropTypes.bool,
    inline: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    strong: PropTypes.bool,
    subtle: PropTypes.bool,
    uppercase: PropTypes.bool,
    weak: PropTypes.bool,
  };

  static defualtProps = {
    Component: 'div',
  };

  render() {
    const {
      Component,
      align,
      breakOn,
      className,
      color,
      emphasise,
      inline,
      size,
      subtle,
      strong,
      weak,
      uppercase,
      ...rest
    } = this.props;

    const classes = classnames(className, 'Text', {
      'Text--block': !inline,
      'Text--emphasise': emphasise,
      'Text--strong': strong,
      'Text--subtle': subtle,
      'Text--weak': weak,
      'Text--uppercase': uppercase,
      [`Text--align-${align}`]: align,
      [`Text--break-${breakOn}`]: breakOn,
      [`Text--color-${color}`]: color,
      [`Text--size-${size}`]: size,
    });

    return (
      <Base { ...rest }
          Component={ Component || (inline ? 'span' : ComponentMap[size]) }
          className={ classes } />
    );
  }
}
