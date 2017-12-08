import { connect } from 'react-redux';
import LaunchPanel from './LaunchPanel';

export default connect(({ hasLaunched, launchCode, messagingToken, rocketId }) => ({
  isStepAuthenticationComplete: rocketId !== undefined,
  isStepCloudFirestoreComplete: hasLaunched,
  isStepCloudFunctionComplete: launchCode !== undefined,
  isStepCloudMessagingComplete: messagingToken !== undefined,
}))(LaunchPanel);

