import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createAction, handleActions } from 'redux-actions';

export const launchCodeGeneratedSuccessful =
  createAction('LAUNCH_CODE_GENERATED_SUCCESSFUL',
    ({ launchCode }) => ({ launchCode }));

export const relayConnectionSuccessful =
  createAction('RELAY_CONNECTION_SUCCESSFUL',
    ({ messagingToken }) => ({ messagingToken }));

export const rocketLaunchSuccessful =
  createAction('ROCKET_LAUNCH_SUCCESSFUL');

export const rocketRegistrationSuccessful =
  createAction('ROCKET_REGISTRATION_SUCCESSFUL',
    ({ uid }) => ({ rocketId: uid }));

export default () => createStore(handleActions({
  [launchCodeGeneratedSuccessful]: (state, { payload }) => ({
    ...state,
    launchCode: payload.launchCode,
  }),
  [relayConnectionSuccessful]: (state, { payload }) => ({
    ...state,
    messagingToken: payload.messagingToken,
  }),
  [rocketLaunchSuccessful]: (state) => ({
    ...state,
    hasLaunched: true,
  }),
  [rocketRegistrationSuccessful]: (state, { payload }) => ({
    ...state,
    rocketId: payload.rocketId,
  }),
}, {
  hasLaunched: false,
  launchCode: undefined,
  messagingToken: undefined,
  rocketId: undefined,
}), composeWithDevTools());
