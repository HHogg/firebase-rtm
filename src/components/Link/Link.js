import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Text from '../Text/Text';
import './Link.css';

export default class Link extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { children, ...rest } = this.props;

    return (
      <Text { ...rest }
          Component="a"
          className="Link"
          emphasise
          subtle>
        { children }
      </Text>
    );
  }
}
