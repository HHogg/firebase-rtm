import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Base from '../Base/Base';
import Text from '../Text/Text';

export default class StepBadge extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
  };

  render() {
    const { children } = this.props;

    return (
      <Base className="StepBadge">
        <Text size="small" strong uppercase>{ children }</Text>
      </Base>
    );
  }
}
