import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { firestore } from 'firebase';
import { rocketRegistrationSuccessful } from '../../store';
import createAuthStateChangeListener from '../../steps/step-1-part-1';
import createAuthenticationHandler from '../../steps/step-1-part-2';
import Button from '../Button/Button';
import Status from '../Status/Status';

class Authentication extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    onAuthentication: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isAuthenticating: true,
    };
  }

  componentDidMount() {
    this.createAuthStateChangeListener();

    if (!this.authStateChangeListener) {
      this.setState({ isAuthenticating: false });
    }
  }

  componentDidUpdate() {
    if (!this.authStateChangeListener) {
      this.createAuthStateChangeListener();
    }
  }

  createAuthStateChangeListener() {
    const onError = (error) => {
      this.setState({
        error: typeof error === 'string' ? error : error.message,
        isAuthenticating: false,
      });
    };

    try {
      this.authStateChangeListener = createAuthStateChangeListener((user) => {
        if (user) {
          firestore()
            .collection('rockets')
            .doc(user.uid)
            .set({
              pilotAvatar: user.photoURL,
              pilotName: user.displayName,
            })
            .then(() => {
              this.props.onAuthentication(user);

              if (this.state.isAuthenticating) {
                this.setState({ isAuthenticating: false });
              }
            })
            .catch(onError);
        } else if (this.state.isAuthenticating) {
          this.setState({ isAuthenticating: false });
        }
      });
    } catch (error) {
      onError(error);
    }
  }

  authenticate() {
    const onSuccess = (result) => {
      this.props.onAuthentication(result.user);
    };

    const onError = (error) => {
      this.setState({
        error: typeof error === 'string' ? error : error.message,
        isAuthenticating: false,
      });
    };

    try {
      this.setState({ error: null, isAuthenticating: true });
      createAuthenticationHandler(onSuccess, onError)
        .then(() => this.setState({ isAuthenticating: false }))
        .catch(onError);
    } catch (error) {
      onError(error);
    }
  }

  render() {
    const { error, isAuthenticating } = this.state;
    const { isAuthenticated } = this.props;

    return (
      <Fragment>
        <Button
            disabled={ isAuthenticating || isAuthenticated }
            margin="x4"
            name="Button to trigger authentication"
            onClick={ () => this.authenticate() }>
          Register
        </Button>

        <Status
            errorMessage={ error }
            isComplete={ isAuthenticated }
            isDoingSomething={ isAuthenticating }
            textComplete="authenticated"
            textDoingSomething="authenticating"
            textError="failed"
            textIncomplete="unauthenticated" />
      </Fragment>
    );
  }
}

export default connect(({ rocketId }) => ({
  isAuthenticated: rocketId !== undefined,
}), {
  onAuthentication: rocketRegistrationSuccessful,
})(Authentication);
