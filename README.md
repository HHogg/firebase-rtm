![](./header.png)

# Firebase: Race To Mars - A Developers Game

A chain reaction game presented at AsyncJS Brighton to demonstrate connecting a bunch of Firebase's products.

#### Summary

1. Set up Github authentication to register your rocket.
1. Set up messaging/push notifications to request a "relay" token
1. Continued messaging set up to receive a launch token, and trigger a HTTP cloud function to generate the launch token.
1. Set up firestore to send the launch code and listen for the check status.

## Participant Set Up Steps

The participants edit files within the App to hook up Firebase services. It is run with webpack-dev-server so HMR should automatically apply changes.

Links to where code needs to be inserted are provided within the UI, along with resources pointing to Firebase guide snippets and API docs.

```
git clone git@github.com:HHogg/firebase-rtm.git
cd firebase-rtm
npm install
npm start
open http://localhost:4000
```

## Presenter Set Up Steps

The presenter has presents a UI that shows the progress of all the participants.

#### Prerequisites

* You have a Firebase account
* You have firebase cli set up
* You have a Github account.


#### 1) Github

Set up a Github application, that your participants will authenticate against.

#### 2) Firebase Set Up

* Go to the [Firebase console](https://console.firebase.google.com/) and create a new project. Toggle on Github Authentication and follow the set up of exchanging the tokens and auth callback URL.

* Click on the 'Web Setup' button and copy the config object for that project.


#### 2) Application Set Up

```
git clone git@github.com:HHogg/firebase-rtm.git
cd firebase-rtm
nvm use
npm install
cd functions
npm install
cd ../
```

* Swap out the project name inside `.firebaserc`
* Swap out the Firebase config inside `./src/initialiseFirebase.js`

#### 3) Cloud Function Set Up

Set a secret to be used for hashing the launch tokens.

```
firebase functions:config:set launch.secret=SECRET_CODE_HERE
```

#### 4) Deploy Everything

```
npm run deploy:functions
npm run deploy:firestore
```


#### 5) Run the application

```
npm run start
open http://localhost:4000/mc
```
