import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import classnames from 'classnames';
import Flex from '../Flex/Flex';
import './LaunchButton.css';

class LaunchButton extends Component {
  static propTypes = {
    rocketId: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      hasLaunched: false,
      isLaunching: false,
    };
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection('rockets')
      .doc(this.props.rocketId)
      .onSnapshot((doc) => {
        if (doc && doc.exists && doc.data().launch) {
          this.setState({ hasLaunched: true });
        }
      });
  }

  launch() {
    this.setState({ isLaunching: true });

    firebase
      .firestore()
      .collection('rockets')
      .doc(this.props.rocketId)
      .update({ launch: true })
      .catch(() => this.setState({ isLaunching: false }));
  }

  render() {
    const { hasLaunched, isLaunching } = this.state;
    const classes = classnames('LaunchButton', {
      ['LaunchButton--launched']: hasLaunched,
    });

    return (
      <Flex
          alignChildrenHorizontal="middle"
          alignChildrenVertical="middle"
          direction="horizontal"
          padding="x6">
        <Flex shrink>
          <button
              className={ classes }
              disabled={ isLaunching || hasLaunched }
              onClick={ () => this.launch() }
              type="button">
            { hasLaunched ? 'Launched!' : 'Launch' }
          </button>
        </Flex>
      </Flex>
    );
  }
}

export default connect(({ rocketId }) => ({
  rocketId,
}))(LaunchButton);
