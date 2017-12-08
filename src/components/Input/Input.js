import React, { Component } from 'react';
import Base from '../Base/Base';
import './Input.css';

export default class Input extends Component {
  render() {
    return (
      <Base { ...this.props }
          Component="input"
          className="Input"
          type="text" />
    );
  }
}
