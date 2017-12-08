import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Base from '../Base/Base';
import Text from '../Text/Text';
import './ErrorMessage.css';

export default class ErrorMessage extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
  };

  render() {
    const { children, ...rest } = this.props;

    return (
      <Base { ...rest } className="ErrorMessage" margin="x2" padding="x2">
        <Text color="red">
          <Text inline strong>Error: </Text>{ children }
        </Text>
      </Base>
    );
  }
}
