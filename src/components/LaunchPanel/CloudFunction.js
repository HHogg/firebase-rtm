import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { launchCodeGeneratedSuccessful } from '../../store';
import createOnMessageListener from '../../steps/step-3-part-2';
import requestLaunchCode from '../../steps/step-3-part-3';
import Button from '../Button/Button';
import Status from '../Status/Status';

class CloudFunction extends Component {
  static propTypes = {
    hasLaunchCode: PropTypes.bool.isRequired,
    messagingToken: PropTypes.string.isRequired,
    onReceiveLaunchCode: PropTypes.func.isRequired,
    rocketId: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isGeneratingLaunchCode: false,
    };
  }

  componentDidMount() {
    this.createOnMessageListener();
  }

  componentDidUpdate() {
    if (!this.messageListener) {
      this.createOnMessageListener();
    }
  }

  createOnMessageListener() {
    this.messageListener = createOnMessageListener(
      (payload) => this.props.onReceiveLaunchCode(payload)
    );
  }

  requestLaunchCode() {
    const { rocketId, messagingToken } = this.props;

    const onSuccess = (response) => {
      if (response.ok) {
        return this.setState({ isGeneratingLaunchCode: false });
      }

      try {
        return response
          .json()
          .then(({ error }) =>
            Promise.reject({ message: error })
          );
      } catch (e) {
        return Promise.reject({ message: 'Unknown error' });
      }
    };

    const onError = (error) => {
      this.setState({
        error: error.message,
        isGeneratingLaunchCode: false,
      });
    };


    try {
      this.setState({ error: null, isGeneratingLaunchCode: true });
      requestLaunchCode(rocketId, messagingToken)
        .then(onSuccess)
        .catch(onError);
    } catch (e) {
      onError(e);
    }
  }

  render() {
    const { error, isGeneratingLaunchCode } = this.state;
    const { hasLaunchCode } = this.props;

    return (
      <Fragment>
        <Button
            disabled={ hasLaunchCode || isGeneratingLaunchCode }
            margin="x4"
            onClick={ () => this.requestLaunchCode() }>
          Request launch code
        </Button>

        <Status
            errorMessage={ error }
            isComplete={ hasLaunchCode }
            isDoingSomething={ isGeneratingLaunchCode }
            textComplete="generated"
            textDoingSomething="generating"
            textError="failed"
            textIncomplete="awaiting launch codes" />
      </Fragment>
    );
  }
}

export default connect(({ launchCode, messagingToken, rocketId }) => ({
  hasLaunchCode: launchCode !== undefined,
  messagingToken,
  rocketId,
}), (dispatch) => ({
  onReceiveLaunchCode: (payload) => {
    dispatch(launchCodeGeneratedSuccessful(payload.data));

    if (window.Notification) {
      new window.Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: payload.notification.icon,
      });
    } else {
      window.alert(payload.notification.body);
    }

  },
}))(CloudFunction);
