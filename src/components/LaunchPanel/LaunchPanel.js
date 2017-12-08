/* eslint-disable max-len*/

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import firebase from 'firebase';
import Flex from '../Flex/Flex';
import Step from '../Step/Step';
import Text from '../Text/Text';
import Authentication from '../LaunchPanel/Authentication';
import CloudFirestore from '../LaunchPanel/CloudFirestore';
import CloudFunction from '../LaunchPanel/CloudFunction';
import CloudMessaging from '../LaunchPanel/CloudMessaging';
import LaunchButton from '../LaunchPanel/LaunchButton';

export default class LaunchPanel extends Component {
  static propTypes = {
    isStepAuthenticationComplete: PropTypes.bool.isRequired,
    isStepCloudFirestoreComplete: PropTypes.bool.isRequired,
    isStepCloudFunctionComplete: PropTypes.bool.isRequired,
    isStepCloudMessagingComplete: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isPresenterReady: false,
    };
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection('presenter')
      .doc('presenter')
      .onSnapshot((doc) => {
        if (doc.exists) {
          this.setState({ isPresenterReady: doc.data().ready });
        }
      });
  }

  render() {
    const {
      isStepAuthenticationComplete,
      isStepCloudFirestoreComplete,
      isStepCloudFunctionComplete,
      isStepCloudMessagingComplete,
    } = this.props;

    if (!this.state.isPresenterReady) {
      return (
        <Flex container maxWidth="42rem">
          <Step isComplete={ false } isDisabled={ false }>
            <pre>
              <Text size="medium" strong>  ___ _         _                    ___ _____ __  __ </Text>
              <Text size="medium" strong> | __(_)_ _ ___| |__  __ _ ___ ___  | _ \_   _|  \/  |</Text>
              <Text size="medium" strong> | _|| | '_/ -_) '_ \/ _` (_-{'<'}/ -_) |   / | | | |\/| |</Text>
              <Text size="medium" strong> |_| |_|_| \___|_.__/\__,_/__/\___| |_|_\ |_| |_|  |_|</Text>
            </pre>

            <pre>
              <Text size="small" strong>                   _ _   _</Text>
              <Text size="small" strong>  __ ___ __ ____ _(_) |_(_)_ _  __ _   __ _ __ _ _ __  ___</Text>
              <Text size="small" strong> / _` \ V  V / _` | |  _| | ' \/ _` | / _` / _` | '  \/ -_)_ _ _</Text>
              <Text size="small" strong> \__,_|\_/\_/\__,_|_|\__|_|_||_\__, | \__, \__,_|_|_|_\___(_|_|_)</Text>
              <Text size="small" strong>                               |___/  |___/</Text>
            </pre>
          </Step>
        </Flex>
      );
    }

    return (
      <Flex container maxWidth="42rem">

        <Step
            description="This step requires you to add Github authentication using Firebase's `auth`
              module. The easiest way to handle the sign in flow is with a popup window. See
              resources below for the required missing snippet."
            isComplete={ isStepAuthenticationComplete }
            isDisabled={ false }
            module="Authentication"
            number="1"
            resources={ [{
              name: 'Authentication state observer',
              location: 'https://firebase.google.com/docs/auth/web/start#set_an_authentication_state_observer_and_get_user_data',
            }, {
              name: 'Github authentication guide',
              location: 'https://firebase.google.com/docs/auth/web/github-auth#handle_the_sign-in_flow_with_the_firebase_sdk',
            }, {
              name: 'Code location (State observer)',
              location: 'https://github.com/HHogg/firebase-rtm/tree/master/src/steps/step-1-part-1.js',
            }, {
              name: 'Code location (Github authentication)',
              location: 'https://github.com/HHogg/firebase-rtm/tree/master/src/steps/step-1-part-2.js',
            }] }
            summary="You need to be granted access by Mission Control before we can start the
              launch process, but somebody has broken the authentication uplink!"
            title="Register your rocket">
          <Authentication />
        </Step>

        <Step
            description="This step requires you to use Firebase's `messaging` module to request
              permissions to send the browser notifications, and request a token to give back to
              the server."
            isComplete={ isStepCloudMessagingComplete }
            isDisabled={ !isStepAuthenticationComplete }
            module="Cloud Messaging"
            number="2"
            resources={ [{
              name: 'Messaging request setup guide',
              location: 'https://firebase.google.com/docs/cloud-messaging/js/client#request_permission_to_receive_notifications',
            }, {
              name: 'Code location',
              location: 'https://github.com/HHogg/firebase-rtm/tree/master/src/steps/step-2-part-1.js',
            }] }
            summary="We received the authorisation signal, but the main communications relay is
              down, you'll need to reconnect it before we can receive the launch codes."
            title="Reconnect communications relay">
          <CloudMessaging />
        </Step>

        <Step
            description="Part 1 of this step requires you to make a request (fetch) to the Cloud
              Function URL, with the `rocketId` and `relayToken` as query parameters. Part 2 requires
              you to use the `messaging` module to handle receiving the launch code, which will be
              displayed as an OS notification."
            isComplete={ isStepCloudFunctionComplete }
            isDisabled={ !isStepCloudMessagingComplete }
            module="Cloud Function"
            number="3"
            resources={ [{
              name: 'Receive Messages guide',
              location: 'https://firebase.google.com/docs/cloud-messaging/js/receive#handle_messages_when_your_web_app_is_in_the_foreground',
            }, {
              name: 'Cloud Function HTTP invocation guie',
              location: 'https://firebase.google.com/docs/functions/http-events#invoke_an_http_function',
            }, {
              name: 'Code location (Messaging service worker)',
              location: 'https://github.com/HHogg/firebase-rtm/tree/master/src/firebase-messaging-sw.js',
            }, {
              name: 'Code location (Messaging receive handler)',
              location: 'https://github.com/HHogg/firebase-rtm/tree/master/src/steps/step-3-part-2.js',
            }, {
              name: 'Code location (Cloud function invoker)',
              location: 'https://github.com/HHogg/firebase-rtm/tree/master/src/steps/step-3-part-3.js',
            }] }
            summary="The remote service to generate a launch code is operational, but someone
              forgot to hook up the panel to request and display the launch code!"
            title="Request and receive the launch code">
          <CloudFunction />
        </Step>

        <Step
            description="This final step requires you to insert a document into the Cloud
              Firestore's `launchCodes` collection. The inserted document should have the id of
              your `rocketId` and a field called `launchCode` with your launch code from step 3.

              If the launch code is correct and has been inserted correctly, then a document with
              your `rocketId` will be inserted into the `launchChecks` collection. You also need
              to create a listener for this document."
            isComplete={ isStepCloudFirestoreComplete }
            isDisabled={ !isStepCloudFunctionComplete }
            module="Cloud Firestore"
            number="4"
            resources={ [{
              name: 'Get realtime updates guide',
              location: 'https://firebase.google.com/docs/firestore/query-data/listen#top_of_page',
            }, {
              name: 'Add data to Firestore guide',
              location: 'https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document',
            }, {
              name: 'Code location (Realtime updates)',
              location: 'https://github.com/HHogg/firebase-rtm/tree/master/src/steps/step-4-part-1.js',
            }, {
              name: 'Code location (Insert document)',
              location: 'https://github.com/HHogg/firebase-rtm/tree/master/src/steps/step-4-part-2.js',
            }] }
            summary="You're almost there. The last thing is to connect the
              ignition line to send the launch code to Mission Control and await the ok to press the
              launch button."
            title="Send the ignition signal">
          <CloudFirestore />
        </Step>

        <Step
            isComplete={ false }
            isDisabled={ !isStepCloudFirestoreComplete }>
          <LaunchButton />
        </Step>

      </Flex>
    );
  }
}
