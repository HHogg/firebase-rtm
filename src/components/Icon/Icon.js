import PropTypes from 'prop-types';
import React, { Component } from 'react';

/* eslint-disable max-len */
const ICONS = {
  'ban': {
    x: 1024, y: 1024,
    p: 'M874.040 149.96c-96.706-96.702-225.28-149.96-362.040-149.96s-265.334 53.258-362.040 149.96c-96.702 96.706-149.96 225.28-149.96 362.040s53.258 265.334 149.96 362.040c96.706 96.702 225.28 149.96 362.040 149.96s265.334-53.258 362.040-149.96c96.702-96.706 149.96-225.28 149.96-362.040s-53.258-265.334-149.96-362.040zM896 512c0 82.814-26.354 159.588-71.112 222.38l-535.266-535.268c62.792-44.758 139.564-71.112 222.378-71.112 211.738 0 384 172.262 384 384zM128 512c0-82.814 26.354-159.586 71.112-222.378l535.27 535.268c-62.794 44.756-139.568 71.11-222.382 71.11-211.738 0-384-172.262-384-384z',
  },
  'tick': {
    x: 1024, y: 1024,
    p: 'M864 128l-480 480-224-224-160 160 384 384 640-640z',
  },
};
/* eslint-enable max-len */

export default class Icon extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.number,
  };

  static defaultProps = {
    size: 16,
  };

  render() {
    const { name, size } = this.props;
    const { x, y, p } = ICONS[name];
    const w = size / ( x / y );

    return (
      <svg
          className="Icon"
          fill="currentColor"
          height={ `${size}px` }
          version="1.1"
          viewBox={ `0 0 ${x} ${y}` }
          width={ `${w}px` }
          xmlns="http://www.w3.org/2000/svg">
        <path d={ p } />
      </svg>
    );
  }
}
