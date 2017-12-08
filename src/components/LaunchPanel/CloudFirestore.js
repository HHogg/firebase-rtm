import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { rocketLaunchSuccessful } from '../../store';
import createSnapshotListener from '../../steps/step-4-part-1';
import sendLaunchCode from '../../steps/step-4-part-2';
import Base from '../Base/Base';
import Button from '../Button/Button';
import Flex from '../Flex/Flex';
import Input from '../Input/Input';
import Status from '../Status/Status';
import Text from '../Text/Text';

class CloudFirestore extends Component {
  static propTypes = {
    hasLaunched: PropTypes.bool.isRequired,
    launchCode: PropTypes.string.isRequired,
    onLaunch: PropTypes.func.isRequired,
    rocketId: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isRequestingLaunch: true,
      launchCode: props.launchCode,
    };
  }

  componentDidMount() {
    this.createSnapshotListener();

    if (!this.snapshotListener) {
      this.setState({ isRequestingLaunch: false });
    }
  }

  componentDidUpdate() {
    if (!this.snapshotListener) {
      this.createSnapshotListener();
    }
  }

  createSnapshotListener() {
    this.snapshotListener = createSnapshotListener(
      this.props.rocketId,
      (snapshot) => {
        if (snapshot.exists) {
          const { clearedForLaunch } = snapshot.data();

          if (clearedForLaunch === true) {
            this.props.onLaunch();
          }

          if (clearedForLaunch !== undefined) {
            this.setState({ isRequestingLaunch: false });
          }
        } else {
          this.setState({ isRequestingLaunch: false });
        }
      }
    );
  }

  sendLaunchCode(event) {
    event.preventDefault();
    this.setState({ error: null, isRequestingLaunch: true });
    sendLaunchCode(this.props.rocketId, this.state.launchCode);
  }

  render() {
    const { error, isRequestingLaunch } = this.state;
    const { hasLaunched } = this.props;

    return (
      <Fragment>
        <Text margin="x2" strong>
          Launch code input:
        </Text>

        <Base
            Component="form"
            margin="x2"
            onSubmit={ (e) => this.sendLaunchCode(e) }>
          <Flex direction="horizontal" gutter="x2">
            <Flex shrink>
              <Input
                  disabled={ hasLaunched || isRequestingLaunch }
                  onChange={ (event) => this.setState({ launchCode: event.target.value }) }
                  value={ this.state.launchCode } />
            </Flex>

            <Flex>
              <Button
                  disabled={
                    hasLaunched ||
                    isRequestingLaunch ||
                    !this.state.launchCode
                  }
                  margin="x4">
                Send Launch Code
              </Button>
            </Flex>
          </Flex>
        </Base>

        <Status
            errorMessage={ error }
            isComplete={ hasLaunched }
            isDoingSomething={ isRequestingLaunch }
            textComplete="launch permission granted"
            textDoingSomething="requesting launch"
            textError="failed"
            textIncomplete="input launch codes" />
      </Fragment>
    );
  }
}

export default connect(({ hasLaunched, launchCode, rocketId }) => ({
  hasLaunched,
  launchCode,
  rocketId,
}), {
  onLaunch: rocketLaunchSuccessful,
})(CloudFirestore);
