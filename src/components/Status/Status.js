import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import ErrorMessage from './ErrorMessage';
import Text from '../Text/Text';
import './Status.css';

export default class Status extends Component {
  static propTypes = {
    errorMessage: PropTypes.string,
    isComplete: PropTypes.bool.isRequired,
    isDoingSomething: PropTypes.bool.isRequired,
    textComplete: PropTypes.string.isRequired,
    textDoingSomething: PropTypes.string.isRequired,
    textError: PropTypes.string.isRequired,
    textIncomplete: PropTypes.string.isRequired,
  };

  render() {
    const {
      errorMessage,
      isComplete,
      isDoingSomething,
      textComplete,
      textDoingSomething,
      textError,
      textIncomplete,
    } = this.props;

    if (errorMessage) {
      return (
        <Fragment>
          <Text color="red" key="status">
            Status: <Text className="StatusError" inline strong uppercase>
              { textError }
            </Text>
          </Text>
          <ErrorMessage key="message">{ errorMessage }</ErrorMessage>
        </Fragment>
      );
    }

    if (isDoingSomething) {
      return (
        <Text color="blue">
          Status: <Text className="StatusDoingSomething" inline strong uppercase>
            { textDoingSomething }
          </Text>
        </Text>
      );
    }

    if (isComplete) {
      return (
        <Text color="green">
          Status: <Text inline strong uppercase>{ textComplete }</Text>
        </Text>
      );
    }

    return (
      <Text color="red">
        Status: <Text className="StatusIncomplete" inline strong uppercase>
          { textIncomplete }
        </Text>
      </Text>
    );
  }
}
