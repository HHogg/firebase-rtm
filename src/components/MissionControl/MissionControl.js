import React, { Component } from 'react';
import firebase from 'firebase';
import omit from 'lodash.omit';
import Avatar from '../Avatar/Avatar';
import Flex from '../Flex/Flex';
import Rocket from './Rocket';
import Satellite from './Satellite';
import Text from '../Text/Text';

const colors = [
  'gray', 'pink', 'violet', 'blue',
  'teal', 'lime', 'orange', 'red',
  'grape', 'indigo', 'cyan', 'green', 'yellow',
];

const getColor = (name) => colors[
  name
    .split('')
    .reduce((acc, val) => acc + val.charCodeAt(), 0)
  % (colors.length - 1)
];

const hasLaunchCode = (rocketId, launchCodes) =>
 !!(launchCodes[rocketId] && launchCodes[rocketId].launchCode);

const isClearedForLaunch = (rocketId, launchChecks) =>
  !!(launchChecks[rocketId] && launchChecks[rocketId].clearedForLaunch);

const isConnected = (rocketId, rockets) =>
  !!(rockets[rocketId].messagingToken);

const isLaunching = (rocketId, rockets, launchChecks) =>
  !!(isClearedForLaunch(rocketId, launchChecks) && rockets[rocketId].launch);

export default class MissionControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rockets: {},
      launchCodes: {},
      launchChecks: {},
    };
  }

  componentDidMount() {
    this.removeUsersSnapshotListener = firebase
      .firestore()
      .collection('rockets')
      .onSnapshot(this.handleSnapshotChange('rockets'));

    this.removeLaunchCodesSnapshotListener = firebase
      .firestore()
      .collection('launchCodes')
      .onSnapshot(this.handleSnapshotChange('launchCodes'));

    this.removeMessagingTokensSnapshotListener = firebase
      .firestore()
      .collection('launchChecks')
      .onSnapshot(this.handleSnapshotChange('launchChecks'));
  }

  componentWillUnmount() {
    this.removeUsersSnapshotListener();
    this.removeLaunchCodesSnapshotListener();
    this.removeMessagingTokensSnapshotListener();
  }

  handleSnapshotChange(collection) {
    return (snapshot) => {
      snapshot.docChanges.forEach(({ doc, type }) =>
        this.setState((state) => ({
          [collection]: {
            added: () => ({ ...state[collection], [doc.id]: doc.data() }),
            modified: () => ({ ...state[collection], [doc.id]: doc.data() }),
            removed: () => omit(state[collection], [doc.id]),
          }[type](),
        }))
      );
    };
  }

  render() {
    const { rockets, launchCodes, launchChecks } = this.state;
    const rocketIds = Object.keys(rockets);

    return (
      <Flex direction="vertical" gutter="x2" padding="x4">
        <Flex direction="horizontal" gutter="x4">
          { rocketIds.map((rocketId) =>
            <Flex container fromWidth="nothing" key={ rocketId }>
              <Satellite
                  color={ getColor(rocketId) }
                  connected={ isConnected(rocketId, rockets) }
                  launch={ isLaunching(rocketId, rockets, launchChecks) } />

              <Rocket
                  color={ getColor(rocketId) }
                  launch={ isLaunching(rocketId, rockets, launchChecks) }
                  ready={ isClearedForLaunch(rocketId, launchChecks) } />
            </Flex>
          ) }
        </Flex>

        <Flex alignChildrenVertical="middle" direction="horizontal" gutter="x4" shrink>
          { rocketIds.map((rocketId) =>
            <Flex fromWidth="nothing" key={ rocketId }>
              <Text align="center" breakOn="all" strong>
                { rockets[rocketId].pilotName }
              </Text>
            </Flex>
          ) }
        </Flex>

        <Flex direction="horizontal" gutter="x4" shrink>
          { rocketIds.map((rocketId) =>
            <Flex fromWidth="nothing" key={ rocketId }>
              <Avatar
                  bounce={ isLaunching(rocketId, rockets, launchChecks) }
                  color={
                    (isClearedForLaunch(rocketId, launchChecks) && 'green') ||
                    (hasLaunchCode(rocketId, launchCodes) && 'blue') ||
                    'red'
                  }
                  flash={ isClearedForLaunch(rocketId, launchChecks) }
                  url={ rockets[rocketId].pilotAvatar } />
            </Flex>
          ) }
        </Flex>
      </Flex>
    );
  }
}
