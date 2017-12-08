import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import Base from '../Base/Base';
import Icon from '../Icon/Icon';

export default class StepIcon extends Component {
  static propTypes = {
    showBan: PropTypes.bool.isRequired,
    showSymbol: PropTypes.bool.isRequired,
    showTick: PropTypes.bool.isRequired,
    symbol: PropTypes.string.isRequired,
  };

  render() {
    const { showBan, showSymbol, showTick, symbol } = this.props;
    const classes = classnames('StepIcon', {
      'StepIcon--complete': showTick,
    });

    return (
      <Base className={ classes }>
        { showBan && <Icon name="ban" size={ 32 } /> }
        { showSymbol && symbol }
        { showTick && <Icon name="tick" size={ 32 } /> }
      </Base>
    );
  }
}
