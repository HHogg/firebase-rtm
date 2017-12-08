const cors = require('cors')({ origin: true });
const firebaseAdmin = require('firebase-admin');
const firebaseFunctions = require('firebase-functions');
const Base64 = require('crypto-js/enc-base64');
const hmacSHA512 = require('crypto-js/hmac-sha512');

firebaseAdmin.initializeApp(firebaseFunctions.config().firebase);

const createMessagePayload = (launchCode) => ({
  notification: {
    title: '⚠️ Launch authorised ⚠️',
    body: `Launch Code: "${launchCode}"`,
    icon: 'https://emojipedia-us.s3.amazonaws.com/thumbs/160/facebook/65/rocket_1f680.png',
  },
  data: {
    launchCode,
  },
});

const createLaunchCode = (rocketId) => {
  const launchToken = Base64.stringify(
    hmacSHA512(rocketId, firebaseFunctions.config().launch.secret)
  );

  const launchCode = launchToken
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(), 0).toString();

  return launchToken.slice(0, 6) + launchCode;
};

exports.generateLaunchCode = firebaseFunctions
  .https
  .onRequest((req, res) => cors(req, res, () => {
    try {
      const { token, rocketId } = req.query;

      return firebaseAdmin
        .messaging()
        .sendToDevice(token, createMessagePayload(createLaunchCode(rocketId)))
        .then(() => res.status(200).json({}))
        .catch((error) => res.status(500).json(error));
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: `${error.name}: ${error.message}`,
      });
    }
  }));

exports.validateLaunchCode = firebaseFunctions
  .firestore
  .document('launchCodes/{rocketId}')
  .onWrite((event) => {
    const { rocketId } = event.params;
    const { launchCode } = event.data.data();

    if (!launchCode) {
      return null;
    }

    return firebaseAdmin
      .firestore()
      .collection('launchChecks')
      .doc(rocketId)
      .set({ clearedForLaunch: launchCode === createLaunchCode(rocketId) });
  });
