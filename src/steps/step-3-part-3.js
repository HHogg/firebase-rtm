/**
 * Name of the Firebase project the cloud function is hosted on.
 */
const PROJECT_NAME = 'fbrtm-mission-control';

/**
 * Name of the cloud function to generate the needed launch code.
 */
const CLOUD_FUNCTION_NAME = 'generateLaunchCode';

/**
 * @param  {string} rocketId Your ships identifier
 * @param  {string} token Your messaging token (step 2)
 * @param  {function} onSuccess Callback to be called on a successful fetch
 * @param  {function} onError Callback to be called on a failed Fetch
 *
 * @return {Promise} Promise resolve/rejected with launch code or error.
 */
export default (rocketId, token, onSuccess, onError) => {

};
