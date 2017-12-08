import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/messaging';

export default firebase.initializeApp({
  apiKey: 'AIzaSyBvufVEhf1GbvIva1eVGF8jfSbw-xWlZmk',
  authDomain: 'fbrtm-mission-control.firebaseapp.com',
  databaseURL: 'https://fbrtm-mission-control.firebaseio.com',
  projectId: 'fbrtm-mission-control',
  storageBucket: '',
  messagingSenderId: '57805114558',
});
