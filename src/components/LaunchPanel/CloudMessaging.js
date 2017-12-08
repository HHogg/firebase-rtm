import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { relayConnectionSuccessful } from '../../store';
import createMessagingHandler from '../../steps/step-2-part-1';
import Button from '../Button/Button';
import Status from '../Status/Status';

class CloudMessaging extends Component {
  static propTypes = {
    isConnected: PropTypes.bool.isRequired,
    onReceieveToken: PropTypes.func.isRequired,
    rocketId: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isConnecting: true,
    };
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection('rockets')
      .doc(this.props.rocketId)
      .onSnapshot((doc) => {
        if (doc && doc.exists) {
          const { messagingToken } = doc.data();

          if (messagingToken) {
            this.props.onReceieveToken({ messagingToken });
          }
        }

        this.setState({ isConnecting: false });
      });
  }

  connectRelay() {
    const onSuccess = (messagingToken) => {
      this.props.onReceieveToken({ messagingToken });

      firebase
        .firestore()
        .collection('rockets')
        .doc(this.props.rocketId)
        .update({ messagingToken });
    };

    const onError = (error) => {
      this.setState({
        error: typeof error === 'string' ? error : error.message,
        isConnecting: false,
      });
    };

    try {
      this.setState({ error: null, isConnecting: true });
      createMessagingHandler(onSuccess, onError)
        .then(() => this.setState({ isConnecting: false }))
        .catch(onError);
    } catch (error) {
      onError(error);
    }
  }

  render() {
    const { error, isConnecting } = this.state;
    const { isConnected } = this.props;

    return (
      <Fragment>
        <Button
            disabled={ isConnected || isConnecting }
            margin="x4"
            name="Button to reconnect the communication relay"
            onClick={ () => this.connectRelay() }>
          Connect Relay
        </Button>

        <Status
            errorMessage={ error }
            isComplete={ isConnected }
            isDoingSomething={ isConnecting }
            textComplete="connected"
            textDoingSomething="connecting"
            textError="failed"
            textIncomplete="disconnected" />
      </Fragment>
    );
  }
}

export default connect(({ messagingToken, rocketId }) => ({
  isConnected: messagingToken !== undefined,
  rocketId,
}), {
  onReceieveToken: relayConnectionSuccessful,
})(CloudMessaging);
